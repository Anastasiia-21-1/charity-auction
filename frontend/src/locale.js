import {createI18n} from "vue-i18n";

export const i18n = createI18n({
  locale: "ua",
  fallbackLocale: "en",
  messages: {
    en: {
      header: {
        home: 'Home',
        auctions: 'Auctions',
        login: 'Login',
        logout: 'Logout',
        charities: 'Charities',
        users: 'Users',
      },
      auth: {
        register: 'Register',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        submitLogin: 'Login',
      },
      auctions: {
        title: 'Auctions',
        startingAt: 'Starting at',
        goTo: 'Go to',
        new: 'Add new',
        fields: {
          title: 'Title',
          description: 'Description',
          startingPrice: 'Starting price',
          currency: 'Currency',
          endsAt: 'End time',
          charityId: 'Charity',
        },
      },
      charities: {
        title: 'Charities',
        new: 'Add new',
        fields: {
          name: 'Name',
          description: 'Description',
          website: 'Website',
        }
      },
      users: {
        title: 'Users',
        comments: 'Comments',
        addComment: 'Add comment',
        of: 'of',
        fields: {
          comment: 'Comment',
          rating: 'Rating',
          submit: 'Submit',
        },
      }
    },
    ua: {
      header: {
        home: 'Головна',
        auctions: 'Аукціони',
        login: 'Увійти',
        logout: 'Вийти',
        charities: 'Благодійні збори',
        users: 'Користувачі',
      },
      auth: {
        register: 'Реєстрація',
        login: 'Увійти',
        email: 'Електронна пошта',
        password: 'Пароль',
        submitLogin: 'Увійти',
      },
      auctions: {
        title: 'Аукціони',
        startingAt: 'Починається з',
        goTo: 'Перейти',
        new: 'Додати новий',
        fields: {
          title: 'Назва',
          description: 'Опис',
          startingPrice: 'Початкова ціна',
          currency: 'Валюта',
          endsAt: 'Кінець',
          charityId: 'Благодійний збір',
        }
      },
      charities: {
        title: 'Благодійні збори',
        new: 'Додати новий',
        fields: {
          name: 'Назва',
          description: 'Опис',
          website: 'Веб-сайт',
        }
      },
      users: {
        title: 'Користувачі',
        comments: 'Коментарі',
        addComment: 'Додати коментар',
        of: 'з',
        fields: {
          comment: 'Коментар',
          rating: 'Рейтинг',
          submit: 'Відправити',
        },
      }
    }
  }
})
