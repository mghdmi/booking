import Step from './step';
import { StepAction } from './step-action';
import { StepNavigation } from './step-navigation';
import { StepNavigationList } from './step-navigation-list';
import { StepPanel } from './step-panel';
import { StepPanelList } from './step-panel-list';

export { useStep } from './step';

export default Object.assign(Step, {
  NavigationList: StepNavigationList,
  Navigation: StepNavigation,
  PanelList: StepPanelList,
  Panel: StepPanel,
  Action: StepAction,
});
