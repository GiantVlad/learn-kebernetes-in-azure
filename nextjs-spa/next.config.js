module.exports = {
    async redirects() {
        console.log('redirected to admin')
        return [
            {
                source: '/',
                destination: '/admin',
                permanent: true,
            },
        ]
    },
}
