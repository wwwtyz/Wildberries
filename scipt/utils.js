// Добавить тег с классом и внутренним текстом
export function getNewTag(tagName, className, text) {
  let newTag = document.createElement(tagName);
  className ? newTag.classList.add(className) : null;
  text ? (newTag.innerText = text) : null;
  return newTag;
}

// Вложить теги parent<child<child
export function appendTag(...arg) {
  for (let i = 0; i < arg.length - 1; i++) {
    arg[i].append(arg[i + 1]);
  }
}

export async function setLocal(key, value) {
  let string = JSON.stringify(value);
  localStorage.setItem(key, string);
}
