const bodyTableElement = document.querySelector('[data-js="table-body"]')

const API_URL = 'http://localhost:3000'

function setFunctionButtons () {
  const editButtonsElement = document.querySelectorAll('[data-js="edit-item"]')
  const deleteButtonsElement = document.querySelectorAll('[data-js="delete-item"]')

  editButtonsElement.forEach(item => item.addEventListener('click', async () => {
    const id = item.getAttribute('data-item-id')
  }))

  deleteButtonsElement.forEach(item => item.addEventListener('click', async () => {
    const id = item.getAttribute('data-item-id')
    await deleteItem(id)
    item.removeEventListener('click')
  }))
}

async function deleteItem (id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
  } catch (err) {
    console.error(err)
  } finally {
    setTableRows()
  }
}

async function getEmployeesList () {
    const result = await fetch(API_URL)
    return result.json()
}

function generateTableRows (list) {
  return list.map(item => {
    return `
    <tr>
      <td>${item.id}</td>
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>${item.salario}</td>
      <td>
        <span data-js="edit-item" data-item-id="${item.id}" class="page-icon material-symbols-outlined">edit</span>
        <span data-js="delete-item" data-item-id="${item.id}" class="page-icon material-symbols-outlined">delete</span>
      </td>
    </tr>
    `
  }).join('')
}

async function setTableRows () {
  try {
    const results = await getEmployeesList()
    bodyTableElement.innerHTML = generateTableRows(results)
  } catch (err) {
    console.error(err)
  } finally {
    setFunctionButtons()
  }
}

window.addEventListener('load', async () => {
  await setTableRows()
})
