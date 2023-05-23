const TabPanel = ({ children, value, index }) => {
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
};

export default TabPanel;