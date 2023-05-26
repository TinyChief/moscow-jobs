import { useApplication } from "../contexts/ApplicationContext";
import ApplicationStatus from "./ApplicationStatus";
import MakeApplication from "./MakeApplication";

export default function ApplicationView() {
  const { send } = useApplication();

  // return <ApplicationStatus />
  return send ? <ApplicationStatus /> : <MakeApplication />;
}
