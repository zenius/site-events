import * as React from "react";
import styles from "./SiteEvents.module.scss";
import { ISiteEventsProps } from "./ISiteEventsProps";
// import { escape } from "@microsoft/sp-lodash-subset";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { MSGraphClient } from "@microsoft/sp-http";
import Card from "./Card";
import EventForm from "./EventForm";

export interface IMyEventsList {
  id: string;
  subject: string;
  start: { dateTime: Date };
  end: { dateTime: Date };
  location: { displayName: string };
}

export interface IMyEventsState {
  events: IMyEventsList[];
}

export default class SiteEvents extends React.Component<ISiteEventsProps, {}> {
  public state = {
    events: []
  };
  public componentDidMount() {
    const { context } = this.props;
    context.msGraphClientFactory.getClient().then(
      (client: MSGraphClient): void => {
        client
          .api("/me/calendar/events")
          .get((error, response: any, rawResponse?: any) => {
            if (response != null) {
              this.setState({
                events: response.value
              });
              console.log(this.state.events);
            }
          });
      }
    );
  }

  public handleClick = () => {
    alert("hello");
  };
  public render(): React.ReactElement<ISiteEventsProps> {
    const { events } = this.state;
    return (
      <div className={styles.siteEvents}>
        <div className={styles.container}>
          <div className="ButtonAddEvent" style={{ margin: "5px" }}>
            <DefaultButton text="Add event" onClick={this.handleClick} />
          </div>
          {/* all the events related to the user */}
          <div className="Events" style={{ width: "100%" }}>
            {events.length != 0 ? (
              <Card events={events} />
            ) : (
              <Card className="DefaultCard" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

if (module.hot) {
  module.hot.accept();
}
