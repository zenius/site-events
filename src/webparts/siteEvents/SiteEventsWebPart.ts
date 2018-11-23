import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  WebPartContext
} from "@microsoft/sp-webpart-base";

import * as strings from "SiteEventsWebPartStrings";
import SiteEvents from "./components/SiteEvents";
import { ISiteEventsProps } from "./components/ISiteEventsProps";

export interface ISiteEventsWebPartProps {
  description: string;
}

export default class SiteEventsWebPart extends BaseClientSideWebPart<
  ISiteEventsWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<ISiteEventsProps> = React.createElement(
      SiteEvents,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
