// mui-overrides.d.ts
import '@mui/material/Checkbox';
import '@mui/material/Switch';
import '@mui/material/Radio';

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/Switch' {
  interface SwitchPropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsSizeOverrides {
    large: true;
  }
}
