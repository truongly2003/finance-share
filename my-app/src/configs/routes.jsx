
const routes={
    Home:"/",
    Transaction: '/finance',
    Overview:'/finance/overview',
    Budget: '/finance/budget',
    BudgetDetail: '/finance/budget/budget-detail/:id',
    Goal: '/finance/goal',
   
    GoalDetail: '/finance/goal/goal-detail/:id',
    Catalog: '/finance/catalog',
    Report: '/finance/report',
    Option: '/finance/option',
    Debt: '/finance/debt',
    Login: '/login',
    SignUp: "/signup",
    LoginPage: "/loginPage",
    HomePage: "/homePage",

    // oauth
    AuthCallBackGoogle: "/oauth2/callback/google",
    AuthCallBackFacebook: "/oauth2/callback/facebook",    
    // settings
    Setting:'/finance/Setting',
    Wallet:'/finance/wallet',
    Checkemail:'/check-email',
    VerifyEmail:'/verify-email-token',

    Profile:'/profile',

    ForgetPassword:'/forgot-password',
    ResetPassword:'/reset-password',

    // community
    HomeCommunity:'/community/post',
    DetailPost:'/community/post/detail-post/:id',
    CreatePost: '/community/post/create',
    MyPost: '/community/post/my-post',
    Friend: 'friend',
    test:'/test',


    AboutUs:'/about-us'
}
export default routes

