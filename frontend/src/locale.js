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
        myDonates: 'My donates',
        adminPanel: 'Admin panel',
      },
      auth: {
        register: 'Register',
        login: 'Login',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        submitLogin: 'Login',
        submitRegister: 'Register',
        dontHaveAcc: 'Don\'t have an account?',
        alreadyHaveAcc: 'Already have an account?',
      },
      auctions: {
        title: 'Auctions',
        startingAt: 'Starting at',
        goTo: 'Go to',
        new: 'Add new',
        makeBet: 'Make a bet',
        currentBet: 'Current bet',
        biggestBet: 'Biggest bet',
        yourBet: 'Your bet',
        minBetError: 'Bet must be bigger than: ',
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
      donates: {
        donate: 'Donate',
        amount: 'Amount',
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
      },
      admin: {
        back: 'Back',
        users: 'Users',
        auctions: 'Auctions',
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
        myDonates: 'Мої пожертви',
        adminPanel: 'Панель адміністора',
      },
      auth: {
        register: 'Реєстрація',
        login: 'Увійти',
        name: 'Ім\'я',
        email: 'Електронна пошта',
        password: 'Пароль',
        submitLogin: 'Увійти',
        submitRegister: 'Зареєструватися',
        dontHaveAcc: 'Не маєте облікового запису?',
        alreadyHaveAcc: 'Вже маєте обліковий запис?',
      },
      auctions: {
        title: 'Аукціони',
        startingAt: 'Починається з',
        goTo: 'Перейти',
        new: 'Додати новий',
        makeBet: 'Зробити ставку',
        currentBet: 'Поточна ставка',
        biggestBet: 'Найбільша ставка',
        yourBet: 'Ваша ставка',
        minBetError: 'Ваша ставка повинна бути більшою за: ',
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
      donates: {
        donate: 'Пожертвувати',
        amount: 'Сума',
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
      },
      admin: {
        back: 'Назад',
        users: 'Користувачі',
        auctions: 'Аукціони',
      }
    }
  }
})
