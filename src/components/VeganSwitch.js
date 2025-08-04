
import { Switch } from 'antd';

const onChange = checked => {
  console.log(`switch to ${checked}`);
};
const VeganSwitchApp = () => <Switch defaultChecked onChange={onChange}/>;

export default VeganSwitchApp;