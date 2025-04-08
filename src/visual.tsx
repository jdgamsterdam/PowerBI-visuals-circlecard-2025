/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/

"use strict";

import * as React from "react";
import { createRoot } from "react-dom/client";
import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ILocalizationManager = powerbi.extensibility.ILocalizationManager;
import FormattingModel = powerbi.visuals.FormattingModel;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import IViewport = powerbi.IViewport;

import ReactCircleCard, { initialState, State } from "./component";
import { Settings } from "./settings";
import "./../style/visual.less";

export class Visual implements IVisual {
    private target: HTMLElement;
    private root: ReturnType<typeof createRoot>;
    private reactRef: React.RefObject<ReactCircleCard>;
    private settings: Settings;
    private viewport: IViewport;
    private formattingSettingsService: FormattingSettingsService;
    private localizationManager: ILocalizationManager;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.settings = new Settings();
        this.localizationManager = options.host.createLocalizationManager();
        this.formattingSettingsService = new FormattingSettingsService(this.localizationManager);
        this.reactRef = React.createRef<ReactCircleCard>();

        // Render the React component using JSX with a ref for direct instance access.
        this.root = createRoot(this.target);
        this.root.render(<ReactCircleCard ref={this.reactRef} />);
    }

    public update(options: VisualUpdateOptions) {
        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];
            this.viewport = options.viewport;
            const { width, height } = this.viewport;
            const size = Math.min(width, height);
    
            // Use dataViews[0] instead of options.dataViews["single"]
            this.settings = this.formattingSettingsService.populateFormattingSettingsModel(
                Settings,
                options.dataViews[0]
            );
            const object = this.settings.circle;
    
            // Build the new state object aligned with the State interface defined in component.tsx.
            const newState: State = {
                size,
                borderWidth: object?.circleThickness.value || undefined,
                labelFontSize: object?.labelFontSize.value || undefined,
                background: object?.circleColor.value.value || undefined,
                textLabel: dataView.metadata.columns[0].displayName,
                textValue: dataView.single.value.toString()
            };
    
            // Update the component's state via the ref.
            if (this.reactRef.current) {
                this.reactRef.current.setState(newState);
            }
        } else {
            this.clear();
        }
    }   

    private clear() {
        if (this.reactRef.current) {
            this.reactRef.current.setState(initialState);
        }
    }

    public getFormattingModel(): FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }
}
