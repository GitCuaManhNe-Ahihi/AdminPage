export const convertBlobtoUrl = (url, public_id) => {
  let iframe = document.getElementsByTagName("iframe")[0];
  let iWindow = iframe?.contentWindow;
  let iDocument = iWindow?.document;
  let arr = iDocument?.getElementsByTagName("img");
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i].src.includes("localhost:3000")) {
      arr[i].src = url[i];
    }
  }
  let public_delete_id = [];
  if (arr.length == 0) {
    public_delete_id = [...public_id];
  }
  for (let i = 0; i < public_id?.length; i++) {
    let checkpoint = 0;
    for (let j = 0; j < arr?.length; j++) {
      if (arr[j].src.indexOf(public_id[i]) == -1) {
        checkpoint++;
      }
    }
    if (checkpoint == arr.length) {
      public_delete_id.push(public_id[i]);
    }
  }
  return public_delete_id;
};
export const publicId = (content) => {
  let public_id = [];
  const url_base = "http://res.cloudinary.com/hauimanhneahihi/image/upload/";
  let indexFirst = content.indexOf(url_base) + url_base.length;
  while (indexFirst - url_base.length != -1) {
    let index = content.indexOf("/", indexFirst);
    let indexLast = content.indexOf(".", index);
    public_id.push(content.slice(index + 1, indexLast));
    indexFirst = content.indexOf(url_base, indexLast) + url_base.length;
  }
  return public_id.toString();
};

export const throttle = (func, limit) => {
  limit = limit || 0;
  let later = 0;
  return () => {
    const now = new Date().getTime();
    if (now - later < limit) {
      return;
    }
    later = now;
    func();
  };
};
export const debounce = (func, wait,value) => {
  wait = wait || 0;
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      func(value);
    }, wait);
  };
};
