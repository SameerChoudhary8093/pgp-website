import pandas as pd
import re
import difflib
from typing import List, Tuple, Dict, Set

try:
    from merge_from_google_sheet import GOOGLE_SHEET_URL, LOOKUP_SHEET_NAME, get_sheet_id_from_url
except Exception:
    GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1ZZzkrkPGY1dxB3lIfDXdGOYy2VSM5vSXJyLhCgi2ARw/edit?usp=sharing"
    LOOKUP_SHEET_NAME = "main"

    def get_sheet_id_from_url(url: str) -> str:
        match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
        if match:
            return match.group(1)
        raise ValueError("Invalid Google Sheets URL format.")

OUTPUT_CSV = "audit_missing_vidhansabhas.csv"


def normalize_name(name: str) -> str:
    if name is None:
        return ""
    s = str(name).strip().lower()
    s = re.sub(r"^\d+\.?\s*", "", s)
    s = re.sub(r"\([^)]*\)", "", s)
    s = re.sub(r"[-_./]", " ", s)
    s = re.sub(r"[^0-9a-z]+", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def read_excel_from_public_sheet(url: str) -> pd.ExcelFile:
    sheet_id = get_sheet_id_from_url(url)
    public_xlsx_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=xlsx"
    return pd.ExcelFile(public_xlsx_url, engine="openpyxl")


def read_lookup_expected(xls: pd.ExcelFile) -> List[Tuple[str, str, str]]:
    df_lookup = xls.parse(LOOKUP_SHEET_NAME)

    expected = []
    current_loksabha = None
    for _, row in df_lookup.iterrows():
        lok = row.get("Loksabha Name")
        if pd.notna(lok) and str(lok).strip() != "":
            current_loksabha = str(lok).strip()
        vid = row.get("Vidhansabha Name")
        if pd.notna(vid) and str(vid).strip() != "":
            vid_clean = re.sub(r"^\d+\.\s*", "", str(vid).strip())
            expected.append((vid_clean, current_loksabha, normalize_name(vid_clean)))
    return expected


def build_tab_index(sheet_names: List[str]) -> Tuple[Set[str], Dict[str, List[str]]]:
    norm_set = set()
    norm_map: Dict[str, List[str]] = {}

    for s in sheet_names:
        if s.strip().lower() == str(LOOKUP_SHEET_NAME).strip().lower():
            continue
        norm = normalize_name(s)
        if not norm:
            continue
        norm_set.add(norm)
        norm_map.setdefault(norm, []).append(s)
    return norm_set, norm_map


def suggest_close_match(target_norm: str, candidates: List[str]) -> str:
    if not candidates:
        return ""
    best = difflib.get_close_matches(target_norm, candidates, n=1, cutoff=0.72)
    return best[0] if best else ""


def main():
    print("Reading Google Sheet and building audit...\n")
    xls = read_excel_from_public_sheet(GOOGLE_SHEET_URL)

    sheet_names = xls.sheet_names
    print(f"Found {len(sheet_names)} total tabs (including lookup)")

    expected = read_lookup_expected(xls)
    print(f"Found {len(expected)} Vidhansabhas in lookup list")

    norm_tab_set, norm_tab_map = build_tab_index(sheet_names)
    print(f"Found {len(norm_tab_set)} unique normalized tab names (excluding lookup)")

    missing_rows = []
    all_norm_tabs = list(norm_tab_set)

    for vid_orig, loksabha, vid_norm in expected:
        if vid_norm not in norm_tab_set:
            suggestion = suggest_close_match(vid_norm, all_norm_tabs)
            suggestion_orig = ", ".join(norm_tab_map.get(suggestion, [])) if suggestion else ""
            missing_rows.append({
                "LoksabhaName": loksabha or "",
                "VidhansabhaName": vid_orig,
                "NormalizedName": vid_norm,
                "ClosestTabSuggestion": suggestion_orig,
            })

    print(f"\nMissing count (lookup v/s tabs): {len(missing_rows)}")

    if missing_rows:
        df_missing = pd.DataFrame(missing_rows)
        df_missing.sort_values(["LoksabhaName", "VidhansabhaName"], inplace=True, ignore_index=True)
        df_missing.to_csv(OUTPUT_CSV, index=False)
        print(f"Report written to {OUTPUT_CSV}")
    else:
        print("No mismatches found. All lookup Vidhansabhas have matching tabs (post-normalization).")


if __name__ == "__main__":
    main()
