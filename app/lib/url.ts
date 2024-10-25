export function changeProtocol<T extends string | URL>(
  url: T,
  proto: string
) {
  let u = url.toString();
  let output = proto + u.slice(u.indexOf(":"));
  
  return new URL(output);
}
