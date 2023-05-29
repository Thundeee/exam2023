// A easy to use TabPanel for material-ui Tabs.
const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

export default TabPanel;
