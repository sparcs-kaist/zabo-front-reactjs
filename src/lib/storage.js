export default (function () {
  try {
    const st = localStorage || {};
    return {
      setItem: (key, object) => {
        st[key] = typeof object === "string" ? object : JSON.stringify(object);
      },
      getItem: (key, parse = true) => {
        if (!st[key]) {
          return null;
        }
        const value = st[key];

        try {
          const parsed = parse ? JSON.parse(value) : value;
          return parsed;
        } catch (e) {
          return value;
        }
      },
      removeItem: (key) => {
        if (localStorage) {
          return localStorage.removeItem(key);
        }
        return delete st[key];
      },
    };
  } catch (err) {
    console.warn(err);
    setTimeout(() => alert("Cookie disabled"), 1000);
    return {
      setItem: (key, object) => "",
      getItem: (key) => "",
      removeItem: (key) => "",
    };
  }
})();
