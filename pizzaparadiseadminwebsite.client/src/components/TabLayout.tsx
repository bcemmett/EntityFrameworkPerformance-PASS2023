import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RestaurantsTab from './RestaurantsTab';
import AccountsTab from './AccountsTab';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabLayout() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Main tab layout area">
          <Tab label="Restaurants" {...a11yProps(0)} />
          <Tab label="Accounts" {...a11yProps(1)} />
          <Tab label="Products" {...a11yProps(2)} />
          <Tab label="Orders" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RestaurantsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AccountsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ProductsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <OrdersTab />
      </CustomTabPanel>
    </Box>
  );
}