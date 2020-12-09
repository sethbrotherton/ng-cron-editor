# Material Cron Editor

This package is intended to facilitate the formatting of cron formatted strings, using Angular and Angular Material.  
This is implemented using Angular's ReactiveFormsModule.

A working demo of this component can be seen [here](http://cron-editor-demo.s3-website-us-east-1.amazonaws.com/)

Standard cron formats are supported as exemplified [here](https://crontab.guru/)

# Dependencies

- Angular 10.1.4
- Angular Material 10.2.3

# Installation

`npm install mat-cron-editor`

# Usage

To configure the `MatCronEditor` component, one must declare a variable of type `CronOptionsInterface`.

For example:
``` ts
cronOptions: CronOptionsInterface = {
    includeMinutes: true,
    includeHours: true,
    includeDates: true,
    includeMonths: true,
    includeDays: true,
    includeMinutesBetween: true,
    includeHoursBetween: true,
    includeDaysBetween: true,
    includeMonthsBetween: true,
    includeDatesBetween: true,
    showHints: true,
    defaultCron: '0 0 1 1 *',
    flexDirection: 'row'
  };
```

In your `.html` file you may now use the component as follows:
```angular2html
<mat-cron-editor
  [cronOptions]="cronOptions"
  (cronEvent)="showCron($event)">
</mat-cron-editor>
```

The `defaultCron` property will automatically set the values of the 'included' fields, if valid.
The `cronEvent` emits an object with `cronForm`(the entire FormGroup so that user can make any additional manipulations as desired) and `cronValue`(the formatted cron value resulting from the form control values).

For example, accessing this emitted value we can set an instance variable each time the form values are changed, like so:
```ts
showCron(event): void {
  this.resultingCron = event.cronValue;
}
```
