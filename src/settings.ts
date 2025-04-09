/*
*  Power BI Visualizations
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

// See https://learn.microsoft.com/en-us/power-bi/developer/visuals/formatting-model-fontcontrol  to try to add more font items.

"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;

export class CircleSettings extends FormattingSettingsCard {
    public circleColor =  new formattingSettings.ColorPicker({
        name: "circleColor",
        displayName: "Color",
        value: { value: "grey" }
    });
    public circleThickness = new formattingSettings.NumUpDown({
        name: "circleThickness",
        displayName: "Thickness",
        value: 10,
    });

    name: string = "circle";
    displayName: string = "Circle";
    slices: FormattingSettingsSlice[] = [this.circleColor, this.circleThickness];
}

export class LabelSettings extends FormattingSettingsCard {
    public labelFontSize = new formattingSettings.NumUpDown({
        name: "labelFontSize",
        displayName: "Label Font Size",
        value: 15,
    });

    name: string = "label";
    displayName: string = "Label";
    slices: FormattingSettingsSlice[] = [this.labelFontSize];
}


export class ValueSettings extends FormattingSettingsCard {
    public valueFontSize = new formattingSettings.NumUpDown({
        name: "valueFontSize",
        displayName: "Value Font Size",
        value: 15,
    });

    name: string = "value";
    displayName: string = "Value";
    slices: FormattingSettingsSlice[] = [this.valueFontSize];
}

export class Settings extends formattingSettings.Model {
    public circle: CircleSettings = new CircleSettings();
    public label: LabelSettings = new LabelSettings();
    public value: ValueSettings = new ValueSettings();
    public cards: formattingSettings.SimpleCard[] = [this.circle, this.label, this.value]    
}