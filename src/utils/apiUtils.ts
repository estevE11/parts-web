export function apiPOST(route: string, body: any) {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    return new Promise((resolve, err) => {
        fetch(baseUrl + '/api/' + route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}