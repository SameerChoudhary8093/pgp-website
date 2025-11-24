import pandas as pd
import re

# --- CONFIGURATION ---
# PASTE THE PUBLIC GOOGLE SHEETS LINK YOU COPIED HERE
# It must be in the format: "https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit?usp=sharing"
GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1ZZzkrkPGY1dxB3lIfDXdGOYy2VSM5vSXJyLhCgi2ARw/edit?usp=sharing"

# The name of the tab that contains the Loksabha-to-Vidhansabha mapping.
LOOKUP_SHEET_NAME = 'main'
MASTER_OUTPUT_FILE = 'master_data_v3_FINAL.csv'

# --- SCRIPT LOGIC ---

def get_sheet_id_from_url(url):
    """Extracts the Google Sheet ID from the shareable URL."""
    match = re.search(r'/d/([a-zA-Z0-9-_]+)', url)
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid Google Sheets URL format.")

def create_lookup_map(df_lookup):
    """Creates a mapping from Vidhansabha name to Loksabha name."""
    print("Creating lookup map from the main sheet...")
    lookup_map = {}
    current_loksabha = None
    for index, row in df_lookup.iterrows():
        if pd.notna(row['Loksabha Name']) and row['Loksabha Name'].strip() != '':
            current_loksabha = row['Loksabha Name'].strip()
        if pd.notna(row['Vidhansabha Name']) and row['Vidhansabha Name'].strip() != '':
            vidhansabha_name = re.sub(r'^\d+\.\s*', '', row['Vidhansabha Name'].strip())
            if current_loksabha:
                lookup_map[vidhansabha_name] = current_loksabha
    print(f"Successfully created lookup map with {len(lookup_map)} entries.")
    return lookup_map

def process_vidhansabha_sheets(xls, sheet_names, lookup_map):
    """Processes all individual Vidhansabha sheets (tabs) and consolidates them."""
    all_rows = []
    print("\nProcessing all Vidhansabha tabs...")

    # NEW: A list of common header/note texts to ignore as data.
    # We check the lower-case version to catch all variations.
    ignore_list = {
        'ward name', 'gram panchayat/ward name', 'total ward',
        'pending', 'nagar palika', 'nagar parishad', 'nagar nigam'
    }

    for sheet_name in sheet_names:
        if sheet_name == LOOKUP_SHEET_NAME:
            continue

        vidhansabha_name = sheet_name.strip()
        loksabha_name = lookup_map.get(vidhansabha_name)

        if not loksabha_name:
            print(f"  - Warning: Could not find Loksabha for tab '{vidhansabha_name}'. Skipping.")
            continue
            
        print(f"  -> Processing tab: {vidhansabha_name}")
        
        df_vidhansabha = xls.parse(sheet_name)
        unit_column_name = df_vidhansabha.columns[0]

        for unit_name in df_vidhansabha[unit_column_name]:
            if pd.isna(unit_name):
                continue
            
            clean_unit_name = str(unit_name).strip()
            
            # NEW, IMPROVED FILTERING:
            # Skip if the name is empty or if any part of it is in our ignore list.
            should_ignore = False
            for item in ignore_list:
                if item in clean_unit_name.lower():
                    should_ignore = True
                    break
            if should_ignore or clean_unit_name == '':
                continue

            local_unit_type = ''
            
            # This is the simple, robust logic that works.
            if clean_unit_name.isdigit():
                local_unit_type = 'Ward'
            else:
                local_unit_type = 'Gram Panchayat'

            all_rows.append({
                'LoksabhaName': loksabha_name,
                'VidhansabhaName': vidhansabha_name,
                'LocalUnitName': clean_unit_name,
                'LocalUnitType': local_unit_type,
            })
            
    return all_rows

def main():
    """Main function to run the entire process from a Google Sheet."""
    if "PASTE_YOUR_GOOGLE_SHEET_LINK_HERE" in GOOGLE_SHEET_URL:
        print("ERROR: Please open the script file and replace 'PASTE_YOUR_GOOGLE_SHEET_LINK_HERE' with your actual Google Sheets link.")
        return

    try:
        sheet_id = get_sheet_id_from_url(GOOGLE_SHEET_URL)
        public_xlsx_url = f'https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=xlsx'
        
        print(f"Reading data from Google Sheet ID: {sheet_id}")
        xls = pd.ExcelFile(public_xlsx_url, engine='openpyxl')
        sheet_names = xls.sheet_names
        
        df_lookup = xls.parse(LOOKUP_SHEET_NAME)
        
        vidhansabha_to_loksabha_map = create_lookup_map(df_lookup)
        
        if vidhansabha_to_loksabha_map:
            consolidated_data = process_vidhansabha_sheets(xls, sheet_names, vidhansabha_to_loksabha_map)
            
            if consolidated_data:
                master_df = pd.DataFrame(consolidated_data)
                master_df.to_csv(MASTER_OUTPUT_FILE, index=False)
                print(f"\nSUCCESS! A final, corrected file '{MASTER_OUTPUT_FILE}' has been created with {len(master_df)} rows.")
                print("Please perform a final verification of this new file.")
            else:
                print("\nError: No data was processed. Please check your sheet names and formats.")

    except Exception as e:
        print(f"\nAn error occurred: {e}")
        print("Please check your Google Sheet link, that it is public, and that your sheet names are correct.")

if __name__ == '__main__':
    main()