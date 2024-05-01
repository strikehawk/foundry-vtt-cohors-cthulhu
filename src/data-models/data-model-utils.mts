import {
  ArrayField,
  DataSchema,
  SchemaField,
  StringField,
} from "foundry-vtt-types/common/data/fields.js";

export type StringArrayField = ArrayField<
  StringField<string, string, boolean, boolean, boolean>,
  string[],
  object,
  boolean,
  boolean,
  boolean
>;

export abstract class BaseDataModel extends foundry.abstract.TypeDataModel {
  public getValidationErrors(): Record<string, unknown> | undefined {
    const errors: Record<string, unknown> = {};

    if (!this.validationFailures.fields) {
      return undefined;
    }

    let field: string;
    let failure: foundry.data.validation.DataModelValidationFailure;
    let errorMsg: string;
    for (const fieldFailure of Object.entries(
      this.validationFailures.fields.fields
    )) {
      field = fieldFailure[0];
      failure = fieldFailure[1];

      if (failure.elements.length > 0) {
        // field is array
        this._processArrayFieldValidationFailure(errors, field, failure);
      } else {
        // regular field
        errorMsg = `${field} ${failure.message}`;
        errors[field] = errorMsg;
      }
    }

    return errors;
  }

  private _processArrayFieldValidationFailure(
    errors: Record<string, unknown>,
    field: string,
    failure: foundry.data.validation.DataModelValidationFailure
  ): void {
    const arrayErrors: string[] = [];
    errors[field] = arrayErrors;

    let errorMsg: string;
    for (const elem of failure.elements) {
      errorMsg = `${field} ${elem.failure.message}`;
      arrayErrors[elem.id as number] = errorMsg;
    }
  }
}

export interface AbstractData<TSchema extends DataSchema> {
  /** Define the data schema for this document instance. */
  readonly schema: SchemaField<TSchema>;

  /** Is the current state of this DataModel invalid? */
  readonly invalid: boolean;

  /** An array of validation failure instances which may have occurred when this instance was last validated. */
  readonly validationFailures: {
    fields: foundry.data.validation.DataModelValidationFailure | null;
    joint: foundry.data.validation.DataModelValidationFailure | null;
  };

  /** Reset the state of this data instance back to mirror the contained source data, erasing any changes. */
  reset(): void;

  getValidationErrors(): Record<string, unknown> | undefined;
}
