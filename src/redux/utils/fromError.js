export default function fromError(error) {
  const msg = __DEVELOPMENT__ 
    ? error.toString() + '\n' + error.stack 
    : error.toString();

  return { msg };
}
