!function(){"use strict";var e={richccTmplDatepicker:'        <div class="uib-datepicker richcc-datepicker" ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)" ng-class="{\'richcc-light\': light,\'collapsed-mode\': !expandedMode,  \'expanded-mode\': expandedMode}">            <div class="richcc-comp-title">&#xA0;</div>            <div class="richcc-cal-holder" ng-class="{\'richcc-light\': light,\'collapsed-mode\': !expandedMode,  \'expanded-mode\': expandedMode}">                <richcc-daypicker ng-switch-when="day"></richcc-daypicker>                <richcc-monthpicker-heatmap ng-switch-when="month" ng-if="yearMapHeat == true" tabindex="0"></richcc-monthpicker-heatmap>                <richcc-monthpicker-eventmap ng-switch-when="month" ng-if="yearMapHeat == false" tabindex="0"></richcc-monthpicker-eventmap>                <richcc-yearpicker ng-switch-when="year" tabindex="0"></richcc-yearpicker>            </div>            <span ng-attr-id="empSpan_{{datePickerUID}}"></span>        </div>    ',richccTmplDay:'        <table class="uib-daypicker richcc-daypicker" role="grid" aria-label="Monthly calendar View" aria-activedescendant="" ng-class="{\'richcc-light\': light,\'collapsed-mode\': !expandedMode,  \'expanded-mode\': expandedMode}" id="tb{{datePickerUID}}" tabindex="{{stopHighlight == true ? -1 : 0}}">            <thead>                <tr class="header-action-holder" ng-class="{\'richcc-light\': light,\'collapsed-mode\': !expandedMode,  \'expanded-mode\': expandedMode}">                    <th colspan="1" ng-if="light != true"></th>                    <th colspan="{{light == true ? 8 : 5}}">                        <div class="header-actions" ng-class="{\'calNavHidden\' : hideCalNav == true}">                            <button class="richcc-icon-container nav-left" cc-key="move(-1)" ng-disabled="preventCalNav == true" ng-hide="hideCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                                <span class="offscreen">Move to previous <span ng-if="datepickerMode == \'day\'"> month</span><span ng-if="datepickerMode == \'month\'"> year</span></span>                            </button>                            <button class="richcc-icon-container labelHolder" id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="preventModeToggle == true">                                <span class="title">{{title}}</span>                                <span class="offscreen"> use arrow keys to move </span>                            </button>                            <button class="richcc-icon-container nav-right" cc-key="move(1)" ng-disabled="preventCalNav == true" ng-hide="hideCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                                <span class="offscreen">Move to next <span ng-if="datepickerMode == \'day\'"> month</span><span ng-if="datepickerMode == \'month\'"> year</span></span>                            </button>                        </div>                    </th>                    <th colspan="1" ng-if="light != true"></th>                </tr>                <tr class="header-dayname-row">                    <th ng-if="showWeeks && false" class="text-center"></th>                    <th colspan="1" ng-repeat="label in labels track by $index" class="text-center dayTitle">                        <span ng-if="light != true"><span class="offscreen" style="position: absolute;clip: rect(1px, 1px, 1px, 1px);padding: 0;border: 0;height: 1px;width: 1px;overflow: hidden;" aria-hidden="false">{{label.full}}</span><span aria-hidden="true">{{label.abbr | limitTo:3}}</span></span>                        <span ng-if="light == true"><span class="offscreen" style="position: absolute;clip: rect(1px, 1px, 1px, 1px);padding: 0;border: 0;height: 1px;width: 1px;overflow: hidden;" aria-hidden="false">{{label.full}}</span><span aria-hidden="true">{{label.abbr | limitTo:2}}</span></span>                    </th>                    <th colspan="1" ng-if="light == true"></th>                </tr>            </thead>            <tbody>                <tr role="row" class="uib-weeks richcc-row" ng-repeat="row in rows track by $index" ng-init="rowindex = $index" ng-class="{\'collapsed-mode\': !expandedMode, \'expanded-mode\': expandedMode}">                    <td ng-if="showWeeks && false" class="text-center h6"><em>{{weekNumbers[$index] }}</em></td>                    <td ng-repeat="dt in row track by $index" class="uib-day text-center richcc-td {{dt.customClass}}" role="gridcell" id="{{dt.uid}}" ng-class="{\'cc-focus\': stopHighlight == false && dt.key == activeDt.key}" colspan="1" ng-disabled="dt.disabled" ng-init="columnindex = $index" ng-click="richccDaySelected(dt, eventDetails[dt.key])" ng-keyup="richccDaySelectedKeyUp($event, dt, eventDetails[dt.key])" ng-keydown="richccDaySelectedKeyUp($event, dt, eventDetails[dt.key])" aria-label="{{dt.dtAriaLabel}} {{dt.current == true ? \'Current Day\' : \'\'}} {{eventDetails[dt.key].length > 0 ? eventDetails[dt.key].length + \' events \' : \'\' }} {{dt.customAriaLabel}}" uib-popover-template="dayPopUpTmpl" popover-trigger="{{popUpTrigger(eventDetails[dt.key])}}" popover-append-to-body="true" popover-placement="{{getPopUpPositionForDayMap(rowindex, columnindex)}}" popover-class="richcc-popup-container">                        <span class="date-num"></span>                        <div class="richcc-icon-container dayHolder" ng-class="{\'cc-current\': dt.current, \'cc-muted\': dt.secondary}" ng-if="light != true" aria-hidden="true">                            <div class="richcc-day">                                <span aria-hidden="true">{{dt.label}}</span>                            </div>                        </div>                        <div class="richcc-time-label" ng-show="showDataLabel == true && light != true" aria-hidden="true">                            <span ng-show="dataLabels[dt.key]" aria-hidden="true">{{dataLabels[dt.key]}}</span>                            <span ng-hide="dataLabels[dt.key]" aria-hidden="true">{{defaultDataLabel}}</span>                            <span class="customIconClass" ng-class="dt.customIconClass"></span>                        </div>                        <span class="offscreen">{{eventDetails[dt.key].length}} events present</span>                        <div class="markHolder pointerNone" ng-show="eventDetails[dt.key].length > 0" ng-if="expandedMode == true" aria-hidden="true">                            <div class="mark step-{{event.step}}" ng-attr-step="{{ event.step}}" ng-attr-order="{{ event.order}}" ng-attr-mtop="{{$index == 0 ? ((event.order - 1) * 36) + \'px\' : \'0\'}}" ng-class="{\'top\': event.order == 1, \'bottom\': event.order == 2}" ng-style="{\'color\': event.color, \'width\': light != true ?  \'calc(\' + 100 * event.paintBoxLength + \'% - 8px)\' : \'calc(\' + 100 * event.paintBoxLength + \'% - 20px)\'}" ng-repeat="event in (eventDetails[dt.key] | filter:{startPaint: true}) track by $index" style="color:#fff;">                                <div class="mark-text-initial" ng-if="light == true" ng-style="{\'color\': event.bgcolor}">{{event.initial | limitTo: 1}}</div>                                <div class="mark-stripe " ng-style="{\'border-color\': light == false && event.highlightBorder == true ? event.highlightBorderColor : \'transparent\'}" ng-class="{\'highlightBorder\': light == false ? event.highlightBorder : \'\'}">                                    <div class="mark-stripe-color" ng-style="{\'background-color\': event.bgcolor}">                                        <span class="text">{{event.name}}</span>                                    </div>                                </div>                            </div>                        </div>                        <div class="markHolder pointerNone" style="position:relative;" ng-show="eventDetails[dt.key].length > 0" ng-if="expandedMode != true" aria-hidden="true">                            <div class="mark step-{{event.step}}" ng-class="{\'top\': event.order == 1, \'bottom\': event.order == 2}" ng-style="{\'color\': event.color, \'width\': light != true ?  \'calc(\' + 100 * event.paintBoxLength + \'% - 8px)\' : \'calc(\' + 100 * event.paintBoxLength + \'% - 20px)\'}" ng-repeat="event in eventDetails[dt.key] track by $index" ng-if="event.startPaint == true" style="color:#fff;">                                <div class="mark-text-initial" ng-if="light == true" ng-style="{\'color\': event.bgcolor}">{{event.initial | limitTo: 1}}</div>                                <div class="mark-stripe" ng-style="{\'border-color\': light == false && event.highlightBorder == true ? event.highlightBorderColor : \'transparent\'}" ng-class="{\'highlightBorder\': light == false ? event.highlightBorder : \'\'}">                                    <div class="mark-stripe-color" ng-style="{\'background-color\': event.bgcolor}">                                        <span class="text">{{event.name}}</span>                                    </div>                                </div>                            </div>                            <div class="mark morePresent" ng-show="eventDetails[dt.key].length > 0 && showMarkerForMoreEvents != false" aria-hidden="true">                                <!--<div class="richcc-icon-container">                                    <i class="richcc-icon icon-more"></i>                                </div>-->                                <div class="circle-marker">                                    <span class="circle"></span><span class="circle"></span><span class="circle"></span>                                </div>                            </div>                        </div>                    </td>                    <td colspan="1" ng-if="light == true" class="richcc-td richcc-light-lastdaymark">                        <span>{{row[6].label}}</span>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthEventViewer:'        <table class="uib-daypicker richcc-monthviewer" role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="" ng-class="{\'richcc-light\': light}" ng-init="parent = $parent">            <thead style="height:0 !important; margin:0;padding:0;line-height:0;">                <tr class="header-action-holder" style="height:0 !important; margin:0;padding:0;line-height:0;">                    <th colspan="1" class="w48" style="height:0 !important; margin:0;padding:0;line-height:0;"></th>                    <th colspan="38" style="height:0 !important; margin:0;padding:0;line-height:0;">&#xA0;</th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row">                    <td colspan="1" class="w48 eventMonthMarker" cc-key="monthSelectCallback()">{{parent.monthViewData[monthIndex].dt.label | limitTo:3}}</td>                    <td ng-repeat="row in parent.monthViewData[monthIndex].rows track by $index" role="gridcell" ng-attr-colspan="{{weekindex == 5 ? 3 : 7}}" class="uib-day text-center richcc-td richcc-td-space{{weekindex}}" ng-init="weekindex = $index">                        <div class="richcc-month-eventbox" ng-repeat="column in row track by $index" ng-if="(weekindex != 5) || (weekindex == 5 && $index < 3)">                            <div class="richcc-eventbox-content {{column.customClass}}" ng-class="{\'notInPresentMonth\' : column.monthIndex != monthIndex, \'showingDates\': parent.eventPopupSettings.showDateInYearView == true}" ng-init="mEvents = parent.monthWiseEventDetails[monthIndex][column.key]" uib-popover-template="monthPopUpTmpl" ng-click="richccDaySelected(column, parent.monthWiseEventDetails[monthIndex][column.key])" popover-trigger="{{popUpTriggerYearView(mEvents)}}" popover-append-to-body="true" popover-placement="{{getPopUpPositionForMonthEventMap(monthIndex, weekindex)}}" popover-class="richcc-popup-container">                                <div class="markHolder pointerNone" style="position:relative;">                                    <div class="month-date" ng-show="column.monthIndex == monthIndex && parent.eventPopupSettings.showDateInYearView == true">{{column.date | date:\'dd\'}}</div>                                    <div class="mark step-{{event.step}}" ng-show="parent.monthWiseEventDetails[monthIndex][column.key].length > 0" ng-class="{\'top\': event.order == 1, \'bottom\': event.order == 2, \'webWorkers\': enableWebWorkers}" ng-style="{\'color\': event.color, \'width\': \'calc(\' + 100 * event.paintBoxLengthForMonth + \'% - 18px)\'}" ng-repeat="event in parent.monthWiseEventDetails[monthIndex][column.key] track by $index" ng-if="event.startPaintForMonth == true" style="color:#fff;">                                        <div class="mark-text-initial" ng-style="{\'color\': event.bgcolor}">{{event.initial | limitTo: 1}}</div>                                        <div class="mark-stripe light" ng-style="{\'border-color\': event.highlightBorder == true ? event.highlightBorderColor : \'transparent\'}" ng-class="{\'highlightBorder\': event.highlightBorder}">                                            <div class="mark-stripe-color" ng-style="{\'background-color\': event.bgcolor}"></div>                                        </div>                                    </div>                                </div>                            </div>                        </div>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthEventWrap:'        <table class="uib-monthpicker richcc-daypicker" role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="">            <thead>                <tr class="header-action-holder">                    <th colspan="1"></th>                    <th colspan="4">                        <div class="header-actions">                            <div class="richcc-icon-container nav-left" cc-key="move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </div>                            <div class="richcc-icon-container labelHolder" id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                <label class="title">{{title}}</label>                            </div>                            <div class="richcc-icon-container nav-right" cc-key="move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </div>                        </div>                    </th>                    <th colspan="1"></th>                </tr>            </thead>            <tbody>                <tr class="uib-months" style="height: 24px;">                    <td colspan="6">                        <rich-months-day-marker></rich-months-day-marker>                    </td>                </tr>                <tr class="uib-months" ng-repeat="row in rows track by $index">                    <td ng-repeat="dt in row track by $index" class="uib-month text-center richcc-month-event-box-holder" role="gridcell" id="{{dt.uid}}" ng-class="dt.customClass" colspan="6">                        <rich-months-event-viewer month-date="dt" month-index="dt.monthIndex" month-select-callback="select(dt.date)"></rich-months-event-viewer>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthHeatViewer:'        <table class="uib-daypicker richcc-monthviewer" role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="" ng-class="{\'richcc-light\': light}" ng-init="parent = $parent">            <thead>                <tr class="header-action-holder">                    <th colspan="7" cc-key="monthSelectCallback()">{{parent.monthViewData[monthIndex].dt.label | limitTo:3}}</th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row" ng-repeat="row in [0,1,2,3,4,5,6] track by $index">                    <td ng-repeat="column in parent.monthViewData[monthIndex].rows track by $index" class="uib-day text-center richcc-td" role="gridcell" id="{{mdt.key}}" colspan="1" ng-style="{\'opacity\': column[row].monthIndex != monthIndex ? 0 : 1}" ng-init="mdt = column[row]; popitem = column[row]" ng-attr-len="{{parent.monthWiseEventDetails[monthIndex][mdt.key].length}}" ng-click="richccDaySelected(column, parent.monthWiseEventDetails[monthIndex][popitem.key])" uib-popover-template="monthPopUpTmpl" popover-trigger="{{parent.monthWiseEventDetails[monthIndex][popitem.key].length > 0 &&  eventPopupSettings.hidden != true ? \'outsideClick\' : \'none\'}}" popover-append-to-body="true" popover-placement="{{getPopUpPositionForMonthHeatMap(monthIndex)}}" popover-class="richcc-popup-container">                        <div class="richcc-mv-box" ng-class="{\'fullyOpaque\': parent.monthWiseEventDetails[monthIndex][mdt.key].length > 2}" ng-attr-transparent="{{parent.monthWiseEventDetails[monthIndex][mdt.key].length}}"></div>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthHeatWrap:'        <table class="uib-monthpicker richcc-daypicker" role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="">            <thead>                <tr class="header-action-holder">                    <th colspan="1" class="w48"></th>                    <th colspan="1"></th>                    <th colspan="4">                        <div class="header-actions">                            <div class="richcc-icon-container nav-left" cc-key="move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </div>                            <div class="richcc-icon-container labelHolder" id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                <label class="title">{{title}}</label>                            </div>                            <div class="richcc-icon-container nav-right" cc-key="move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </div>                        </div>                    </th>                    <th colspan="1"></th>                </tr>            </thead>            <tbody>                <tr class="uib-months" ng-repeat="row in rows track by $index">                    <td class="uib-month text-center w48" role="gridcell" colspan="1">                        <rich-months-day-marker></rich-months-day-marker>                    </td>                    <td ng-repeat="dt in row track by $index" class="uib-month text-center" role="gridcell" id="{{dt.uid}}" ng-class="dt.customClass" colspan="1">                        <rich-months-heat-viewer month-date="dt" month-index="dt.monthIndex" month-select-callback="select(dt.date)"></rich-months-heat-viewer>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthViewerDayMarker:'        <table class="uib-daypicker richcc-monthviewer" role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="" ng-class="{\'richcc-light\': light}" ng-init="parent = $parent">            <thead ng-if="yearMapHeat == true">                <tr class="header-action-holder">                    <th colspan="1">&#xA0;</th>                </tr>            </thead>            <thead style="height:0 !important; margin:0;padding:0;line-height:0;" ng-if="yearMapHeat == false">                <tr class="header-action-holder" style="height:0 !important; margin:0;padding:0;line-height:0;">                    <th colspan="1" class="w48" style="height:0 !important; margin:0;padding:0;line-height:0;"></th>                    <th colspan="38" style="height:0 !important; margin:0;padding:0;line-height:0;">&#xA0;</th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row" ng-repeat="row in [0,1,2,3,4,5,6] track by $index" ng-if="yearMapHeat == true">                    <td class="uib-day text-center richcc-td" role="gridcell">                        <span class="marker" ng-show="$index == 1 || $index == 3 || $index == 5">{{monthWiseEventMarkers[0][row].abbr | limitTo:1}}</span>                    </td>                </tr>                <tr class="uib-weeks richcc-row" ng-if="yearMapHeat == false">                    <td colspan="1" class="w48">&#xA0;</td>                    <td ng-repeat="row in parent.monthViewData[0].rows track by $index" role="gridcell" ng-attr-colspan="{{weekindex == 5 ? 3 : 7}}" class="uib-day text-center richcc-td richcc-td-space{{weekindex}}" ng-init="weekindex = $index">                        <div class="richcc-month-eventbox eventDayMarker" ng-repeat="column in row track by $index" ng-if="(weekindex != 5) || (weekindex == 5 && $index < 3)">                            <span>{{monthWiseEventMarkers[0][$index].abbr | limitTo:1}}</span>                        </div>                    </td>                </tr>            </tbody>        </table>    ',richccTmplPopup:'        <div>            <ul class="uib-datepicker-popup dropdown-menu richcc-datepicker-popup" dropdown-nested="" ng-if="isOpen" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">                <li ng-transclude=""></li>                <li ng-if="showButtonBar" class="uib-button-bar">                    <span class="btn-group pull-left">                        <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>                        <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null)">{{ getText(\'clear\') }}</button>                    </span>                    <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close()">{{ getText(\'close\') }}</button>                </li>            </ul>        </div>    ',richccTmplDayPopup:'        <div class="richcc-day-popup" ng-init="popUpTriggered(dt.key)" ng-attr-id="popup_{{dt.key}}" tabindex="0" ng-keyup="popUpKeyUp($event, dt.key)">            <div class="event-container" ng-class="{\'noActions\': !(eventPopupSettings.showLeft || eventPopupSettings.showRight)}">                <div class="event-container-label">{{dt.date | date:eventPopupSettings.labelDateFilter}} <span ng-show="eventDetails[dt.key].length > 0 ">({{eventDetails[dt.key].length}} <span ng-show="eventDetails[dt.key].length != 1">Events</span><span ng-show="eventDetails[dt.key].length == 1">Event</span>)</span></div>                <div class="event-details-container">                    <div class="event-detail" tabindex="0" ng-repeat="event in eventDetails[dt.key] | orderBy:\'isHoliday\' track by $index" ng-click="popUpEventClickHandler(dt, event)" ng-class="{\'event-holiday\' : event.isHoliday}" ng-style="{\'background-color\': (event.isHoliday ? event.bgcolor: \'#fff\')}" ng-keyup="popUpEventKeyUpHandler(dt, event, $event)">                        <div class="event-marker"></div>                        <div class="event-title-holder" ng-style="{\'border-left-color\': event.bgcolor}" ng-class="{ \'highlightBorder\': event.highlightBorder}">                            <span class="event-title">{{event.name}}</span><span ng-if="event.isHoliday != true"> : </span><span class="event-subject" ng-if="event.isHoliday != true">{{event.subject}}</span>                            <div class="event-timing-holder" ng-if="event.isHoliday != true">                                <span class="event-time">{{event.startDtFQ | date:eventPopupSettings.dateFilter}}</span><span style="padding: 0 15px;">-</span><span class="event-time">{{event.endDtFQ | date: eventPopupSettings.dateFilter}}</span>                            </div>                            <p class="event-time" style="text-transform:none;">{{event.timeMetaData}}</p>                            <div class="event-timing-holder" ng-if="event.isHoliday == true">                                <span class="event-time holiday">{{event.holidayType}}</span>                            </div>                        </div>                    </div>                </div>            </div>            <div class="event-action-container" ng-class="{\'singleButtonOnly\' : (eventPopupSettings.showLeft != false && eventPopupSettings.showRight == false) || (eventPopupSettings.showLeft == false && eventPopupSettings.showRight != false)}" ng-show="eventPopupSettings.showLeft || eventPopupSettings.showRight">                <button class="event-action" ng-if="eventPopupSettings.showLeft != false" ng-click="popUpLeftHandler(dt, eventDetails[dt.key])">{{eventPopupSettings.leftLabel || \'Add Events\'}}</button>                <button class="event-action" ng-if="eventPopupSettings.showRight != false" ng-click="popUpRightHandler(dt, eventDetails[dt.key])">{{eventPopupSettings.rightLabel || \'Edit Events\'}}</button>                <div class="event-separator"></div>            </div>        </div>    ',richccTmplRichccMonthPopup:'        <div class="richcc-day-popup" ng-init="">            <div class="event-container" ng-class="{\'noActions\': !(parent.eventPopupSettings.showLeft || parent.eventPopupSettings.showRight)}">                <div class="event-container-label">{{column.date | date: parent.eventPopupSettings.labelDateFilter}} <span ng-show="parent.monthWiseEventDetails[monthIndex][column.key].length > 0 ">({{parent.monthWiseEventDetails[monthIndex][column.key].length}} <span ng-show="parent.monthWiseEventDetails[monthIndex][column.key].length != 1">Events</span><span ng-show="parent.monthWiseEventDetails[monthIndex][column.key].length == 1">Event</span>)</span></div>                <div class="event-details-container">                    <div class="event-detail" ng-repeat="event in parent.monthWiseEventDetails[monthIndex][column.key] track by $index" ng-click="popUpEventClickHandler(column, event)">                        <div class="event-marker"></div>                        <div class="event-title-holder" ng-style="{\'border-left-color\': event.bgcolor}" ng-class="{ \'highlightBorder\': event.highlightBorder}">                            <span class="event-title">{{event.name}}</span> : <span class="event-subject">{{event.subject}}</span>                            <p class="event-time" style="text-transform:none;">{{event.timeMetaData}}</p>                            <div class="event-timing-holder">                                <span class="event-time">{{event.startDtFQ | date: parent.eventPopupSettings.dateFilter}}</span><span style="padding: 0 15px;">-</span><span class="event-time">{{event.endDtFQ | date: parent.eventPopupSettings.dateFilter}}</span>                            </div>                        </div>                    </div>                </div>            </div>            <div class="event-action-container" ng-class="{\'singleButtonOnly\' : (parent.eventPopupSettings.showLeft != false && parent.eventPopupSettings.showRight == false) || (parent.eventPopupSettings.showLeft == false && parent.eventPopupSettings.showRight != false)}" ng-show="parent.eventPopupSettings.showLeft || parent.eventPopupSettings.showRight">                <button class="event-action" ng-if="parent.eventPopupSettings.showLeft != false" ng-click="popUpLeftHandler(column, parent.monthWiseEventDetails[monthIndex][column.key])">{{parent.eventPopupSettings.leftLabel || \'Add Events\'}}</button>                <button class="event-action" ng-if="parent.eventPopupSettings.showRight != false" ng-click="popUpRightHandler(column, parent.monthWiseEventDetails[monthIndex][column.key])">{{parent.eventPopupSettings.rightLabel || \'Edit Events\'}}</button>                <div class="event-separator"></div>            </div>        </div>    ',richccTmplYear:'        <table class="uib-yearpicker richcc-daypicker" role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="">            <thead>                <tr class="header-action-holder">                    <th colspan="1"></th>                    <th colspan="3">                        <div class="header-actions">                            <button class="richcc-icon-container nav-left" cc-key="move(-1)" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </button>                            <button class="richcc-icon-container labelHolder" id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode">                                <label class="title">{{title}}</label>                            </button>                            <button class="richcc-icon-container nav-right" cc-key="move(1)" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </button>                        </div>                    </th>                    <th colspan="1"></th>                </tr>            </thead>            <thead>            </thead>            <tbody>                <tr class="uib-years" ng-repeat="row in rows track by $index">                    <td ng-repeat="dt in row track by $index" class="uib-year text-center" role="gridcell" id="{{dt.uid}}" ng-class="dt.customClass">                        <button type="button" class="btn btn-default" uib-is-class="                                \'btn-info\' for selectedDt,                                \'active\' for activeDt                                on dt" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1">                            <span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span>                        </button>                    </td>                </tr>            </tbody>        </table>    ',richccTmplYearHybridOne:'        <div class="uib-datepicker richcc-datepicker fixedWidth" role="application" ng-keydown="ricchYear.keydown($event)" ng-attr-id="{{::ricchYear.rid}}" ng-keyup="ricchYear.keyup($event)">            <div class="richcc-cal-holder">                <table class="uib-monthpicker richcc-daypicker" role="grid" aria-label="Yearly calendar View for {{ricchYear.currentYear}}" aria-activedescendant="" style="width:100%;height:100%;" tabindex="0" ng-attr-id="{{dtPickerYearID}}">                    <thead>                        <tr class="header-action-holder">                            <th colspan="43">                                <div class="header-actions">                                    <div class="richcc-icon-container nav-left" ng-click="ricchYear.move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                        <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                                        <span class="offscreen">Move to previous year {{ricchYear.currentYear - 1}}</span>                                    </div>                                    <div class="richcc-icon-container labelHolder" id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                        <p class="title">{{ricchYear.title}}</p>                                        <span class="offscreen"> use arrow keys to move </span>                                    </div>                                    <div class="richcc-icon-container nav-right" ng-click="ricchYear.move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                        <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                                        <span class="offscreen">Move to next year {{ricchYear.currentYear + 1}}</span>                                    </div>                                </div>                            </th>                        </tr>                    </thead>                    <tbody>                        <tr class="uib-months h40" style="height: 24px;">                            <td class="w48" colspan="1"></td>                            <td colspan="7" ng-repeat="rindex in ::ricchYear.numOfWeeks track by $index">                                <table class="uib-daypicker richcc-year-top-head" role="grid" aria-labelledby="{{::uniqueId}}-title" ng-class="{\'richcc-light\': light}">                                    <thead style="height:0 !important; margin:0;padding:0;line-height:0;">                                        <tr class="header-action-holder" style="height:0 !important; margin:0;padding:0;line-height:0;">                                            <th colspan="1" class="w48" style="height:0 !important; margin:0;padding:0;line-height:0;"></th>                                            <th colspan="38" style="height:0 !important; margin:0;padding:0;line-height:0;">&#xA0;</th>                                        </tr>                                    </thead>                                    <tbody>                                        <tr class="uib-weeks richcc-row">                                            <td role="gridcell" class="uib-day text-center richcc-td header-token eventMonthMarker" ng-repeat="token in ::ricchYear.weekDayMarkers track by $index">                                                <span>{{::token.abbr | limitTo:1}}</span>                                            </td>                                        </tr>                                    </tbody>                                </table>                            </td>                        </tr>                        <tr role="row" class="uib-months h40" ng-repeat="month in ricchYear.months track by $index" ng-init="mIndex = $index;" ng-class="{\'collapsed-mode\': !expandedMode, \'expanded-mode\': expandedMode}">                            <td class="w48 eventMonthMarker" colspan="1">{{::ricchYear.monthLabels[$index] | limitTo:3}}</td>                            <td ng-repeat="week in month.rows track by $index" class="uib-month text-center richcc-month-event-box-holder" role="gridcell" id="{{week.uid}}" ng-class="week.customClass" colspan="7" ng-init="wIndex = $index;">                                <table class="uib-daypicker richcc-monthviewer" role="grid" ng-class="{\'richcc-light\': light}">                                    <tbody>                                        <tr class="uib-weeks richcc-row richcc-year-row" ng-attr-id="row_{{::mIndex}}_{{::wIndex}}" ng-class="{\'noInitials\' : datepickerOptions.noInitials != false}"></tr>                                    </tbody>                                </table>                            </td>                        </tr>                    </tbody>                </table>            </div>        </div>    '
};angular.module("richcc.bootstrap.datepicker").run(["$templateCache",function(t){t.put("template/richcc/datepicker.html",e.richccTmplDatepicker),t.put("template/richcc/day.html",e.richccTmplDay),t.put("template/richcc/monthEventViewer.html",e.richccTmplMonthEventViewer),t.put("template/richcc/monthEventWrap.html",e.richccTmplMonthEventWrap),t.put("template/richcc/monthHeatViewer.html",e.richccTmplMonthHeatViewer),t.put("template/richcc/monthHeatWrap.html",e.richccTmplMonthHeatWrap),t.put("template/richcc/monthViewerDayMarker.html",e.richccTmplMonthViewerDayMarker),t.put("template/richcc/popup.html",e.richccTmplPopup),t.put("template/richcc/richccDayPopup.html",e.richccTmplDayPopup),t.put("template/richcc/richccMonthPopup.html",e.richccTmplRichccMonthPopup),t.put("template/richcc/year.html",e.richccTmplYear),t.put("template/richcc/richcc-year-tmpl.html",e.richccTmplYearHybridOne)}])}();