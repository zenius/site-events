import * as React from "react";
import { IMyEventsList } from "./SiteEvents";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

export interface ICardProps {
  className?: string;
  events?: IMyEventsList[];
}

export default class Card extends React.Component<ICardProps, {}> {
  public render() {
    const { className, events } = this.props;
    let ButtonSeeAll = events ? (
      events.length > 3 ? (
        <DefaultButton text="See All" style={{margin:"5px"}} />
      ) : (
        <div />
      )
    ) : (
      <div />
    );
    return (
      <div>
        {events ? (
          events.map((event, index) => {
            if (index <= 2) {
              return (
                <div
                  className="CardWrapper"
                  style={{
                    width: "30%",
                    margin: "5px",
                    display: "inline-block",
                    verticalAlign: "middle"
                  }}
                >
                  <div
                    id={event.id}
                    style={{ height: "250px", border: "1px solid lightgray" }}
                  >
                    <div className="EventTitle">
                      <Label style={{ textTransform: "uppercase" }}>
                        {event.subject}
                      </Label>
                    </div>
                    <div className="EventTime">
                      <Label>
                        {new Date(
                          event.start.dateTime.toString()
                        ).toDateString()}
                      </Label>
                    </div>
                    <div className="EventLocation">
                      <Label>{event.location.displayName}</Label>
                    </div>
                  </div>
                </div>
              );
            } else { 
              return null; 
            }
          })
        ) : (
          <div
            className="CardWrapper"
            style={{ width: "30%", margin: "5px", display: "inline-block" }}
          >
            <div
              className={className}
              style={{
                height: "250px",
                border: "1px solid lightgray"
              }}
            >
              <Label>No upcoming events</Label>
            </div>
          </div>
        )}
        {ButtonSeeAll} 
      </div>
    );
  }
}
