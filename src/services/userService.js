// auth-service.js

const API = 'http://localhost:3000';

export async function getUsers() {

    try {

        return await fetch(`${API}/users`);

    }
    catch (error) {

        return error.message;
    }
}

export async function deleteById(id) {

    try {

        return await fetch(`${API}/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

    }
    catch (error) {

        return error.message;
        
    }

}



// export const signUp = (body) => {
//     return fetch({
//         method: 'POST',
//         url: `${API}/sign-up`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });
// };

// export const signIn = (body) => {
//     return fetch({
//         method: 'POST',
//         url: `${API}/sign-in`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });
// };