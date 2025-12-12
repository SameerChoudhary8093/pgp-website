import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function baseProps({ size = 18, className, ...rest }: IconProps) {
  return { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, className, ...rest } as const;
}

export const HomeIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <path d="M3 12l9-9 9 9" />
    <path d="M9 21V9h6v12" />
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="4" />
    <rect x="14" y="9" width="7" height="12" />
    <rect x="3" y="12" width="7" height="9" />
  </svg>
);

export const ElectionsIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const AdminIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21c1.5-3 4.5-5 8-5s6.5 2 8 5" />
  </svg>
);

export const VoteIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <path d="M9 12l2 2 4-4" />
    <rect x="3" y="12" width="18" height="8" rx="2" />
  </svg>
);

export const IdCardIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="12" r="2" />
    <path d="M13 10h6M13 14h6" />
  </svg>
);

export const RecruitmentIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <path d="M3 17a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4" />
    <circle cx="12" cy="7" r="3" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="11" r="3" />
    <path d="M3 20c0-3 3-5 5-5" />
    <path d="M11 20c0-3 3-5 5-5" />
  </svg>
);

export const ZonesIcon: React.FC<IconProps> = (p) => (
  <svg {...baseProps(p)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 3v18" />
  </svg>
);
