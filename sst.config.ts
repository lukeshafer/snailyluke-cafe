import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "snailyluke-cafe",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
