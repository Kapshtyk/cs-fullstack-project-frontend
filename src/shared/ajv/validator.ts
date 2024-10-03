import Ajv, { _, KeywordErrorDefinition } from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import ajvKeywords from "ajv-keywords";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajvErrors(ajv);
ajvKeywords(ajv);

const error: KeywordErrorDefinition = {
  message: "Passwords do not match",
};

ajv.addKeyword({
  keyword: "passwordMatch",
  type: "object",
  schema: false,
  error,
  validate: function (data, _schema, _parentSchema) {
    return data.password === data.confirmPassword;
  },
  errors: true,
});

export const validator = ajv;
