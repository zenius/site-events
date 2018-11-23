import * as React from "react";
import {TextField} from  "office-ui-fabric-react/lib/TextField"; 
export default class EventForm extends React.Component<{}, {}> {
  public render() {
    return (
      <form>
        <div>
          <TextField
          placeholder ="Event Title"
            required={true}
          />
        </div>
      </form>
    );
  }
}
