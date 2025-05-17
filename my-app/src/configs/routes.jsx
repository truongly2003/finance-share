
const routes={
    Home:"/",
    Transaction: '/transaction',
    Overview:'/overview',
    Budget: '/budget',
    BudgetDetail: '/budget/budget-detail/:id',
    Goal: '/goal',
    Groups: '/groups',
    GoalDetail: '/goal/goal-detail/:id',
    Catalog: '/catalog',
    Report: '/report',
    Option: '/option',
    Debt: '/debt',
    Login: '/login',
    SignUp: "/signup",
    LoginPage: "/loginPage",
    HomePage: "/homePage",
    // oauth
    AuthCallBackGoogle: "/oauth2/callback/google",
    AuthCallBackFacebook: "/oauth2/callback/facebook",    
    // settings
    Setting:'/Setting',
    Profile:'/profile',
    Wallet:'/wallet',
    GroupDetail: '/group-detail/:id',
    Checkemail:'/check-email',
    VerifyEmail:'/verify-email-token',

    ForgetPassword:'/forgot-password',
    ResetPassword:'/reset-password',
}
export default routes

