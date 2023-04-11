# Sveltekit Template

Sveltekit template - inspired by [Hackathon Starter](https://hackathon-starter.walcony.com)

Koa API with authentication, refresh token, password reset - repo can be found here [koa-api](https://github.com/mylastore/koa-blog-api)

## DEMO
[Demo App](https://sveltekit.mylastore.com/)

## Included

- Bootstrap 5 CSS (Bootstrap 5 is now Modular)
- Formatting with ESLint and Prettier
- User authentication with JWT token (register users must confirm email to create an account)
- User profile page with [gravatar](https://en.gravatar.com/) if available else displays a default image
- User forgot password
- User roles (customer, admin)
- Admin panel section displaying all register users and stats
- Pagination inspired by [svelte-paginate](https://github.com/TahaSh/svelte-paginate#readme)

## Getting started
- Rename the demo.env to .env enter your info
- Create certs directory inside the secrets directory and generate local certs inside. Secure cookie are used on local development (to simulate production issue).

    git clone https://github.com/mylastore/svelte-kit

    npm install && npm start

Now head over to your favorite browser and open up `localhost:3001` and you are ready to go.

## IMPORTANT! Start the [API](https://github.com/mylastore/koa-blog-api) repository and follow the instructions on how to seed the sample users data

Login as ADMIN me@me.com and Password1

Login as customer me1@me.com Password1

## License

[MIT](http://opensource.org/licenses/MIT)
