import { combineReducers } from 'redux';
// importing all the reducers.
import receivedBriifsReducer, { userBriifsCount } from './reducers/ReceivedBriifs';
import archivedBriifsReducer, { draftBriifsReducer } from './reducers/ArchivedBriifs';
import sendBriifsReducer from './reducers/SendBriifs';
import deleteSendReducer, { deleteDraftBriifReducer } from './reducers/DeleteSend';
import deleteReceivedReducer from './reducers/DeleteReceived';
import archivedReducer from './reducers/Archived';
import unArchivedReducer from './reducers/UnArchived';
import forwardBriifReducer from './reducers/Forward';
import forwardSelectedUsersBriifReducer, { forwardDraftUsersBriifReducer } from './reducers/ForwardSelectedUsers';
import forwardSelectedGroupsBriifReducer from './reducers/ForwardSelectedGroups';
import pinnedBriifReducer from './reducers/PinnedBriif';
import unPinnedBriifReducer from './reducers/UnPinnedBriif';
import readBriifReducer from './reducers/ReadBriif';
import unReadBriifReducer from './reducers/UnReadBriif';
import playedBriifReducer from './reducers/PlayedBriif';
import interactionReducer from './reducers/Interaction';
import interactionDeleteReducer from './reducers/InteractionDelete';
import interactionInsertCommentReducer from './reducers/InteractionInsertComment';
import reactionsReducer from './reducers/Reactions';
import loginReducer, { logoutReducer } from './reducers/Login';
import ds_TotalBriifs from './reducers/ds_TotalBriifs';
import InteractionsDetail from './reducers/ds_InteractionsDetail';
import ActiveUsers from './reducers/ds_ActiveUsers';
import LiveUsers from './reducers/ds_LiveSessions';
import LiveMeetingUsers from './reducers/LiveMeetingUsers';
import ReducerStatistics from './reducers/ds_Statistics';
import ReducerGeneralStatistics from './reducers/ds_GeneralStatistics';
import ReducerInteractionsType from './reducers/ds_InteractionsType';
import sidebarReducer from './reducers/Sidebar';
import Notifications, { notificationReducer } from './reducers/Notifications';
import createBriifReducer from './reducers/CreateBriif';
import reducerSearchReceive, { reducerSearchDraft } from './reducers/SearchReceive';
import reducerSearchSend from './reducers/SearchSend';
import reducerSearchArchive from './reducers/SearchArchive';
import globalSearchReducer, { GetPlatReducer, SelectedReducer } from './reducers/GlobalSearch';
import getPlatReducer from './reducers/GetPlat';
import ReduSendToken from './reducers/ReduSendToken';
import getRecomendUserReducer from './reducers/GetRecomendUser';
import insertLikeReducer from './reducers/InsertLike';
import chapSubChapReducer from './reducers/ChapSubChap';
import followUserReducer, { followStatusReducer } from './reducers/FollowUser';
import unFollowReducer from './reducers/UnFollow';
import globalSearchTabsReducer from './reducers/GlobalSearchTabs';
import screenRecordingReducer from './reducers/ScreenRecording';
import getPlatformCategoriesReducer from './reducers/GetPlatformCategories';
import globalSearchApplyFilterReducer from './reducers/GlobalSearchApplyFilter';
import SignupdetailformDropdown from './reducers/SignupdetailformDropdown';
import SignupForm from './reducers/SignupForm';
import UserProfileReducer from './reducers/UserProfileReducer';
import readAllNotificationsReducer from './reducers/ReadAllNotifications';
import playBriifFunctionReducer from './reducers/PlayBriifFunction';
import UserGroupsReducer from './reducers/UserGroupsReducer';
import UserGiistsReducer from './reducers/UserGiistsReducer';
import RankingStatsReducer from './reducers/KH_RankingStatsRed';
import MyRankingsReducer from './reducers/KH_MyRankingsRed';
import KH_homeGiistsRed from './reducers/KH_homeGiistsRed';
import Kh_LatestGiistsReducer from './reducers/Kh_LatestGiistsReducer';
import Kh_followedGiistsReducer from './reducers/Kh_FollowedUserReducer';
import Kh_WatchedGiistsReducer from './reducers/Kh_WatchedGiistsReducer';
import Kh_WatchAgainReducer from './reducers/Kh_WatchAgainReducer';
import anyUserDataReducer from './reducers/AnyUserData';
import Kh_FavouriteGiistReducer from './reducers/Kh_FavouriteGiistReducer';
import updateUserProfileReducer from './reducers/UpdateUserProfile';
import ProfileGiistsSearchFilter from './reducers/ProfileGiistsSearchFilter';
import FilterCategories from './reducers/FilterCategories';
import PublishedGiists from './reducers/PublishedGiists';
import ShareWithmeGiistsRed from './reducers/ShareWithMeGiists';
import FavouriteGiistsRed from './reducers/FavouriteGiistsRed';
import AwaitingReviewGiistsRed from './reducers/AwaitingReviewGiistsRed';
import CountingDigGiistsRed from './reducers/CountingDifGiistsRed';
import giistDetailDataReducer from './reducers/GiistDetailData';
import Kh_PlayGiistsReducer from './reducers/Kh_PlayGiistsReducer';
import DelUserGiistRed from './reducers/DelUserGiistRed';
import MediaCollectionRed from './reducers/MediaCollectionRed';
import MediaAdditionRed from './reducers/MediaAdditionRed';
import giistCommentReducer from './reducers/GiistComment';
import giistPostCommentReducer from './reducers/GiistPostComment';
import giistEditCommentReducer from './reducers/GiistEditComment';
import giistDeleteCommentReducer from './reducers/GiistDeleteComment';
import giistCommentReactionReducer from './reducers/GiistCommentReaction';
import DelMediaRed from './reducers/DelMediaRed';
import MediaRecCountRed from './reducers/MediaRecCountRed';
import CreateGiistDetailRed from './reducers/CreateGiistDetailRed';
import CreateChapsRed from './reducers/CreateChapsRed';
import GiistShowToEditRed from './reducers/GiistShowToEditRed';
import CreateChapsMediaRed from './reducers/CreateChapsMediaRed';
import Kh_RejectGiistReducer from './reducers/Kh_RejectGiistReducer';
import giistEditReducer from './reducers/GiistEdit';
import updateGiistReducer from './reducers/UpdateGiist';
import khQuizQuestionDelete from './reducers/kh_QuizDelete';
import DeleteChapterRed from './reducers/DeleteChapterRed';
import Kh_StatisticsReducer from './reducers/Kh_StatisticsReducer';
import KhChapterQuizDelete from './reducers/Kh_ChapterQuizDelete';
import Kh_TotalGiistsReducer, { kh_EngagementGiistReducer } from './reducers/Kh_TotalGiistsReducer';
import Kh_GiistInteractionsReducer from './reducers/Kh_GiistInteractionReducer';
import Kh_UnpublishGiistReducer from './reducers/Kh_UnpublishGiistReducer';
import UserActivitiesReducer from './reducers/UserActivitiesReducer';
import Kh_QuizPlayReducer, { Kh_FinalQuizTimeUp, Kh_SubmitGetResultReducer } from './reducers/Kh_QuizPlayReducer';
import { Kh_SubmitAnwer } from './actions/Kh_QuizPlay';
import kh_PreviewGiistReducer from './reducers/kh_PreviewGiistReducer';
import CommentsRed from './reducers/giist_comments/LoadCommentsRed';
import kh_FinalQuizReducer from './reducers/kh_FinalQuizReducer';
import Kh_SearchReducer from './reducers/Kh_SearchReducer';
import RatingsReducer from './reducers/RatingsReducer';
import platformGroupsReducer, { DeleteGroupsReducer, EditGroupsReducer } from './reducers/PlatformGroupReducer';
import createGroupsReducer from './reducers/CreateGroupsReducer';
import CategoriesReducer from './reducers/CategoriesReducer';
import CreateCategoriesReducer from './reducers/CreateCategoriesReducer';
import DeleteCategoryReducer from './reducers/DeleteCategoryReducer';
import ViewCategoryReducer from './reducers/ViewCategoryReducer';
import UpdateCategoryReducer from './reducers/UpdateCategoryReducer';
import TopRatedGiistsRed from './reducers/TopRatedGiistsRed';
import platformReducer from './reducers/PlatformReducer';
import DeletePlatformReducer from './reducers/DeletePlatformReducer';
import createPlatformReducer from './reducers/CreatePlatformReducer';
import ViewPlatformReducer from './reducers/ViewPlatformReducer';
import updatePlatformReducer from './reducers/UpdatePlatformReducer';
import { DeleteGiistChapMediaRed } from './reducers/DeleteGiistChapMediaRed';
import {
  deleteBriifReducer,
  deleteBriifsReducer,
  deleteGiistsCommentReducer,
  deleteGiistsReducer,
  deleteInteractionReducer,
  deleteMeetingReducer,
  deleteUserCommentReducer,
} from './reducers/DeleteDashBoardDataReducer';
import groupMembersReducer from './reducers/GroupMemeberReducer';
import SetGlobalPinnedRed from './reducers/globalpinned/SetGlobalPinnedRed';
import UsersInConferenceReducer from './reducers/UsersInConferenceReducer';
import SendChannelReducer from './reducers/SendChannelReducer';
import { CreateConferenceRed } from './reducers/CreateConferenceRed';
import ConferenceInvitationRed from './reducers/ConferenceInvitationRed';
import ConferenceUsersListRed from './reducers/ConferenceUsersListRed';
import JoinMeetingRed from './reducers/JoinMeetingRed';

import ViewPlatformUserReducer from './reducers/VIewPlatformUserReducer';
import platformCreateUserReducer from './reducers/PlatformCreateUserReducer';
import platformUpdateUserReducer from './reducers/PlatformUpdateUserReducer';
import DeleteGroupMemberReducer from './reducers/DeleteGroupMemberReducer';
import groupMembersIdsReducer from './reducers/GroupMembersIdsReducer';
import otpVerifyReducer from './reducers/OtpVerifyReducer';
import resendOtpReducer from './reducers/ResendOtpReducer';
import RemoveUserMeetReducer from './reducers/RemoveUserMeetReducer';
import RecordConferenceStartReducer from './reducers/RecordConferenceStartRed';
import AddHostConferenceRed from './reducers/AddHostConferenceRed';

// combineReducers function helps you organize your reducers to manage their own slices of state.
const rootReducer = combineReducers({
  // to get all the received briifs.
  received_briifs: receivedBriifsReducer,
  // to get all the archive briifs.
  archived_briifs: archivedBriifsReducer,
  // to get all the send briifs.
  send_briifs: sendBriifsReducer,
  // to delete the send briif.
  delete_send: deleteSendReducer,
  // to delete the received briif.
  delete_received: deleteReceivedReducer,
  // to archive the briif.
  archived: archivedReducer,
  // to un archive the briif.
  unArchived: unArchivedReducer,
  // to get all users data.
  forward_briif: forwardBriifReducer,
  // forward the briif to selected users.
  forward_selected_users_briif: forwardSelectedUsersBriifReducer,
  // forward the briif to selected groups.
  forward_selected_groups_briif: forwardSelectedGroupsBriifReducer,

  forward_Draft_Users_Briif_Reducer: forwardDraftUsersBriifReducer,
  // pin the briif.
  pinned_briif: pinnedBriifReducer,
  // un pin the briif.
  unPinned_briif: unPinnedBriifReducer,
  // read the briif.
  read_briif: readBriifReducer,
  // un read the briif.
  unRead_briif: unReadBriifReducer,
  // get briif that is playing.
  played_briif: playedBriifReducer,
  // get interactions data.
  interaction: interactionReducer,
  // to delete comment in interaction.
  interaction_delete: interactionDeleteReducer,
  // to insert a comment in interactions.
  interaction_insert_comment: interactionInsertCommentReducer,
  // to capture the reaction(like, idea, celebration) on a comment in interactions of briif.
  reactions: reactionsReducer,
  // for login
  login: loginReducer,
  // dashboard root reducers.
  comment: ds_TotalBriifs,
  detail: InteractionsDetail,
  users: ActiveUsers,
  liveusers: LiveUsers,
  graph: ReducerStatistics,
  statistics: ReducerGeneralStatistics,
  // get the interactions on briif data.
  interactions: ReducerInteractionsType,
  // to handle state of receive, send and archive states through out the whole web.
  sidebar: sidebarReducer,
  // to get notifications.
  all_notifications: Notifications,
  // to create briif.
  create_briif: createBriifReducer,
  // local search.
  SearchReceive: reducerSearchReceive,
  searchSend: reducerSearchSend,
  searchArchive: reducerSearchArchive,
  searchDraft: reducerSearchDraft,
  // global search.
  global_search: globalSearchReducer,
  // to get platform data.
  get_plat: getPlatReducer,
  // to get all giists list.
  get_recomend_user: getRecomendUserReducer,
  // giists like/ unlike.
  insert_like: insertLikeReducer,
  // to get single giist.
  chap_sub_chap: chapSubChapReducer,
  // follow user.
  follow_user: followUserReducer,
  // un follow user.
  un_follow: unFollowReducer,
  // global search tabs.
  global_search_tabs: globalSearchTabsReducer,

  // sendToken
  token: ReduSendToken,

  //live_meeting users
  get_allusers: LiveMeetingUsers,

  // screen recording states manage.
  screen_recording: screenRecordingReducer,

  // get the list of all giists categories.
  get_platform_categories: getPlatformCategoriesReducer,

  global_search_apply_filter: globalSearchApplyFilterReducer,

  // Inspire Signup details form dropdown
  get_salutation: SignupdetailformDropdown,
  // Inspire Signup form
  post_formData: SignupForm,
  // user profile
  all_profileUsers: UserProfileReducer,
  // to read all the notifications.
  read_all_notifications: readAllNotificationsReducer,
  //get briif playing function globally
  play_briif_function: playBriifFunctionReducer,
  // user profile groups
  users_groups: UserGroupsReducer,
  // user profile activities
  users_activities: UserActivitiesReducer,
  // user profile giists
  users_giists: UserGiistsReducer,
  // home stats in KH
  combine_home_stats: RankingStatsReducer,
  // home my rankings in KH
  combine_home_rankings: MyRankingsReducer,
  //home giists in knowledge hub
  all_home_giists: KH_homeGiistsRed,
  //latest giists in knowledge hub
  latest_giists: Kh_LatestGiistsReducer,
  //followed user giists in knowledge hub
  followed_user_giists: Kh_followedGiistsReducer,
  //watched giists in knowledge hub
  watched_giists: Kh_WatchedGiistsReducer,
  //watch again giists in knowledge hub
  watch_again_giists: Kh_WatchAgainReducer,
  //other user profile data
  any_user_data: anyUserDataReducer,
  // change favourite Giist
  favourite_giist: Kh_FavouriteGiistReducer,
  // update user profile data
  update_user_profile: updateUserProfileReducer,
  // user profile search filter
  user_profile_search_filter: ProfileGiistsSearchFilter,
  // user profile filter Categories
  profile_filter_Categories: FilterCategories,
  // published giists reducer for published giists page
  published_giists: PublishedGiists,
  // share with me reducer for published giists page
  share_me_giists: ShareWithmeGiistsRed,
  // favourite giists reducer for published giists page
  favourite_giists: FavouriteGiistsRed,
  // Awaiting Review giists reducer for published giists page
  awaiting_review_giists: AwaitingReviewGiistsRed,
  // Counting number of giists reducer for published giists page
  counting_number_giists: CountingDigGiistsRed,
  // giists detail data
  giist_detail_data: giistDetailDataReducer,
  // play giists video
  play_giists: Kh_PlayGiistsReducer,
  // delete giist
  del_giist: DelUserGiistRed,
  // media library medias
  lib_medias: MediaCollectionRed,
  // media addition
  add_media: MediaAdditionRed,
  // get all comments of a specific giist
  giist_Comment: giistCommentReducer,
  // to post a comment on a giist
  giist_post_comment: giistPostCommentReducer,
  // to edit a comment of a giist
  giist_edit_comment: giistEditCommentReducer,
  // to delete a comment of a giist
  giist_delete_comment: giistDeleteCommentReducer,
  // to react on a comment of a giist
  giist_comment_reaction: giistCommentReactionReducer,
  // delete media form media library
  del_media: DelMediaRed,
  // media counting in media library
  media_counting: MediaRecCountRed,
  // create giist category detail
  create_giist_detail: CreateGiistDetailRed,
  // create chapters in giistcreation detail
  create_giist_chapters: CreateChapsRed,
  // giistcreation detail show for edit in giistcreation
  showing_edit_giist: GiistShowToEditRed,
  // creating media in chapters
  chapter_media_creation: CreateChapsMediaRed,
  // reject Giist
  rejectGiist: Kh_RejectGiistReducer,
  // to edit a giist
  giist_edit: giistEditReducer,
  // to update a giist
  update_giist: updateGiistReducer,
  // delete_chapter
  delete_chapter: DeleteChapterRed,

  delete_question: khQuizQuestionDelete,
  // kh stats dashboard
  kh_stats: Kh_StatisticsReducer,
  // kh total giists
  kh_totalgiist: Kh_TotalGiistsReducer,
  // kh giists interaction
  giistInteraction: Kh_GiistInteractionsReducer,
  Kh_Chapter_QuizDelete: KhChapterQuizDelete,
  Kh_PlayGiists_Reducer: Kh_PlayGiistsReducer,

  Kh_QuizPlay_Reducer: Kh_QuizPlayReducer,
  Kh_QuizSubmit_Reducer: Kh_SubmitAnwer,

  Kh_UnpublishGiist_Reducer: Kh_UnpublishGiistReducer,

  Kh_SubmitGetResult_Reducer: Kh_SubmitGetResultReducer,

  kh_PreviewGiist_Reducer: kh_PreviewGiistReducer,

  interaction_comments: CommentsRed,

  Kh_Search_Reducer: Kh_SearchReducer,

  Final_Attempted: kh_FinalQuizReducer,

  Follow_Status_Reducer: followStatusReducer,

  giist_rating: RatingsReducer,

  Kh_FinalQuizTimeUp: Kh_FinalQuizTimeUp,

  Selected_Reducer: SelectedReducer,
  GetPlat_Reducer: GetPlatReducer,
  kh_Engagement_Giist_Reducer: kh_EngagementGiistReducer,

  platform_Groups_Reducer: platformGroupsReducer,

  Create_Groups_Reducer: createGroupsReducer,
  Edit_Groups_Reducer: EditGroupsReducer,

  Delete_Groups_Reducer: DeleteGroupsReducer,

  plat_category: CategoriesReducer,

  create_category: CreateCategoriesReducer,

  delete_category: DeleteCategoryReducer,

  view_category: ViewCategoryReducer,

  update_category: UpdateCategoryReducer,

  top_rated_giists: TopRatedGiistsRed,

  admin_platform: platformReducer,

  delete_platform: DeletePlatformReducer,

  createPlatform: createPlatformReducer,

  view_platform: ViewPlatformReducer,

  update_platform: updatePlatformReducer,

  del_chapMedia: DeleteGiistChapMediaRed,
  group_members: groupMembersReducer,

  // This for dashboard
  delete_giist: deleteGiistsReducer,
  delete_giist_comment: deleteGiistsCommentReducer,
  delete_briif: deleteBriifReducer,

  delete_meeting: deleteMeetingReducer,
  view_users: ViewPlatformUserReducer,
  create_users: platformCreateUserReducer,
  update_users: platformUpdateUserReducer,
  view_platform_user: ViewPlatformUserReducer,
  delete_group_member: DeleteGroupMemberReducer,
  group_members_ids: groupMembersIdsReducer,
  deleteBriifsReducer: deleteBriifsReducer,

  draft_Briifs_Reducer: draftBriifsReducer,

  delete_DraftBriif_Reducer: deleteDraftBriifReducer,
  global_pinned: SetGlobalPinnedRed,

  usersInMeet: UsersInConferenceReducer,
  sendChannel: SendChannelReducer,

  notificationReducer: notificationReducer,
  delete_interaction: deleteInteractionReducer,

  conference_invitation: ConferenceInvitationRed,
  get_conference_data: CreateConferenceRed,
  conference_users: ConferenceUsersListRed,
  join_confernce_data: JoinMeetingRed,

  delete_comments: deleteUserCommentReducer,
  otp_verify: otpVerifyReducer,
  resend_otp: resendOtpReducer,

  removeUser: RemoveUserMeetReducer,
  response_recording: RecordConferenceStartReducer,
  add_host_conference: AddHostConferenceRed,
  user_Briifs_Count: userBriifsCount,
  logout_Reducer: logoutReducer,
});

export default rootReducer;
