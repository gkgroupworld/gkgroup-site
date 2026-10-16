process.env.NODE_ENV = "test";
// Fail rather than silently making any external request in the local test suite.
globalThis.fetch = async () => { throw new Error("External network forbidden in synthetic tests"); };
