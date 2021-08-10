# Sveltekit Template

Sveltekit template - inspired by [Hackathon Starter](https://hackathon-starter.walcony.com)

Koa API repo can be found here [koa-api](https://github.com/mylastore/koa-blog-api)

## DEMO
[Demo App](https://sveltekit.mylastore.com/)

## Included

- Bootstrap 5 CSS (Bootstrap 5 is now Modular)
- Formatting with ESLint and Prettier
- User authentication with JWT token (register users must confirm email to create an account)
- User profile page with [gravatar](https://en.gravatar.com/) if available else displays a default image
- User forgot password
- User roles (customer, admin)
- Admin panel section displaying all register users, notification settings and stats
- Pagination inspired by [svelte-paginate](https://github.com/TahaSh/svelte-paginate#readme)

## Getting started

    git clone https://github.com/mylastore/svelte-kit

    npm install && npm start

Now head over to your favorite browser and open up `localhost:3000` and you are ready to go.

## IMPORTANT! Start the [API](https://github.com/mylastore/koa-blog-api) repository and follow the instructions on how to seed the sample data for authentication to work

Login as ADMIN me@me.com and Password#1

Login as customer me1@me.com Password#1

## License

[MIT](http://opensource.org/licenses/MIT)