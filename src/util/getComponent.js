export const getComponent = (container, menu, link) => {
    container.innerHTML = ''
    for (let item of menu) {
        if (sessionStorage.getItem(link) === item.link) {
            container.appendChild(item.component.render())
            return;
        }
    }
}