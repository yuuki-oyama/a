/* 定数を定義するファイル*/

const serverAccessUrl = {
    GetTodoList: '/todoList',
    PostTodoListAdd: '/todoList/add',
    PostTodoListEdit: '/todoList/edit',
    PostTodoListDelete: '/todoList/delete',
};

const buttonName = {
    addButton: '追加',
    clearButton: 'クリア',
    deletButton: '削除',
    confButton: '内容確定',
};

const errorMessage = {
    confrictError: '同じ内容を追加することは出来ません。',
    unexpectedError: '予期せぬエラーが発生しました。',
};

const successMessage = {
    add: '新規登録が完了しました。',
    edit: '編集が完了しました。',
    delete: '削除が完了しました。',
};

export { serverAccessUrl, buttonName, errorMessage, successMessage };
