/**
 * 学习过程中的工具函数
 */

// 1.判断是否是对象
function isObject(val) {
  return val === Object(val)
}
// 2.判断对象是否为空
function isEmptyObject(obj) {
  return !Object.keys(obj).length
}
// 3.获取变量数据类型
function getType(variable) {
  return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}
// 4.深拷贝
function deepCopy(data) {
  const t = getType(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

// 5.元素滚动, x,y都出现滚动条时,会同时滚动
function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  scroll(from, to, step);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
}

// 6.查找子组件
function findComponentDownward (context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
      for (const child of childrens) {
          const name = child.$options.name;
          if (name === componentName) {
              children = child;
              break;
          } else {
              children = findComponentDownward(child, componentName);
              if (children) break;
          }
      }
  }
  return children;
}