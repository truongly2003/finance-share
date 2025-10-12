import routes from "@configs/routes";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
// client
import Transaction from "@client/Transaction";
import Overview from "@client/Overview";
import Budget from "@client/Budget";

import Goal from "@/pages/client/Goal";

import Login from "@client/Authentication/Login";
import SignUp from "@client/Authentication/SignUp";

import BudgetDetail from "@/pages/client/BudgetDetail";
import GoalDetail from "@/pages/client/GoalDetail";

import AuthCallback from "@/pages/client/Authentication/AuthCallback";
import Home from "@/pages/client/Home";
import TransactionLayout from "@/layouts/TransactionLayout";
import CheckEmail from "@/pages/client/Authentication/CheckEmail";
import VerifyEmail from "@/pages/client/Authentication/VerifyEmail";
import ForgotPassword from "@/pages/client/Password/ForgotPassword";
import ResetPassword from "@/pages/client/Password/ResetPassword";
// import Groups from "@/pages/client/Groups";
import GroupDetail from "@/pages/client/GroupDetail";
import Setting from "@/pages/client/Setting";
import { GroupProvider } from "@/context/GroupContext";
import CommunityLayout from "@/layouts/CommunityLayout";
import HomeCommunity from "@/pages/community/Post";
import CommentSection from "@/pages/community/Comment/CommentSection";
import MyPost from "@/pages/community/MyPost";
import DetailPost from "@/pages/community/Post/DetailPost";
import CreatePost from "@/pages/community/Post/CreatePost";
export const publicRoutes = [
  { path: routes.Home, component: Home, layout: DefaultLayout },
  {
    path: routes.Transaction,
    component: Transaction,
    layout: TransactionLayout,
  },
  { path: routes.Login, component: Login, layout: null },
  { path: routes.SignUp, component: SignUp, layout: null },
  { path: routes.Auth, component: AuthCallback, layout: null },
  { path: routes.Checkemail, component: CheckEmail, layout: null },
  { path: routes.VerifyEmail, component: VerifyEmail, layout: null },
  { path: routes.ForgetPassword, component: ForgotPassword, layout: null },
  { path: routes.ResetPassword, component: ResetPassword, layout: null },
  {
    path: routes.AuthCallBackGoogle,
    component: () => <AuthCallback provider="google" />,
    layout: null,
  },
  {
    path: routes.AuthCallBackFacebook,
    component: () => <AuthCallback provider="facebook" />,
    layout: null,
  },
  { path: routes.HomeCommunity, component: HomeCommunity, layout: CommunityLayout },
  { path: routes.test, component: CommentSection, layout: null },

  { path: routes.DetailPost, component: DetailPost, layout: CommunityLayout },
  
  { path: routes.CreatePost, component: CreatePost, layout: CommunityLayout },
  { path: routes.MyPost, component: MyPost, layout: CommunityLayout },
];
export const privateRoutes = [
  { path: routes.Overview, component: Overview, layout: TransactionLayout },
  { path: routes.Setting, component: Setting, layout: TransactionLayout },
  {
    path: routes.GroupDetail,
    component: () => (
      <GroupProvider>
        <GroupDetail />
      </GroupProvider>
    ),
    layout: TransactionLayout,
  },
  { path: routes.Budget, component: Budget, layout: TransactionLayout },
  // { path: routes.Groups, component: Groups, layout: TransactionLayout },
  {
    path: routes.BudgetDetail,
    component: BudgetDetail,
    layout: TransactionLayout,
  },
  { path: routes.Goal, component: Goal, layout: TransactionLayout },
  { path: routes.GoalDetail, component: GoalDetail, layout: TransactionLayout },
];
