// Communication Hub web actions all Types.
// to get all the received briifs.
export const RECEIVED_BRIIFS = 'RECEIVED_BRIIFS';

// to get all the archived briifs.
export const ARCHIVED_BRIIFS = 'ARCHIVED_BRIIFS';

// to get all the send briifs.
export const SEND_BRIIFS = 'SEND_BRIIFS';

// to delete a send briif.
export const DELETE_SEND = 'DELETE_SEND';

// to delete a received briif.
export const DELETE_RECEIVED = 'DELETE_RECEIVED';

// to archive a briif.
export const ARCHIVED = 'ARCHIVED';

// to un archive a briif.
export const UN_ARCHIVED = 'UN_ARCHIVED';

// to get all the users list.
export const FORWARD_BRIIF = 'FORWARD_BRIIF';

// to forward a briif to the users.
export const FORWARD_SELECTED_USERS_BRIIF = 'FORWARD_SELECTED_USERS_BRIIF';

// to forward a briif to the groups.
export const FORWARD_SELECTED_GROUPS_BRIIF = 'FORWARD_SELECTED_GROUPS_BRIIF';

// to pinned a briif.
export const PINNED_BRIIF = 'PINNED_BRIIF';

// to un pinned a briif.
export const UN_PINNED_BRIIF = 'UN_PINNED_BRIIF';

// to read a briif.
export const READ_BRIIF = 'READ_BRIIF';

// to un read a briif.
export const UN_READ_BRIIF = 'UN_READ_BRIIF';

// for inserting comment in interaction on briif.
export const PLAYED_BRIIF = 'PLAYED_BRIIF';

// for getting interaction data.
export const INTERACTION = 'INTERACTION';

// for dashboard loading and dashboard data getting.
export const INTERACTION_DELETE = 'INTERACTION_DELETE';

// for inserting comment in interaction on briif.
export const INTERACTION_INSERT_COMMENT = 'INTERACTION_INSERT_COMMENT';

// for getting reaction (like, idea, celebration) on a comment in interaction.
export const REACTIONS = 'REACTIONS';

// for login.
export const LOGIN = 'LOGIN';

// for dashboard loading and dashboard data getting.
export const FETCH_TOTAL_INTERACTIONS = 'FETCH_TOTAL_INTERACTIONS';
export const FETCH_TOTAL_INTERACTIONS_SUCCESS = 'FETCH_TOTAL_INTERACTIONS_SUCCESS';
export const FETCH_TOTAL_INTERACTIONS_FAILED = 'FETCH_TOTAL_INTERACTIONS_FAILED';
export const FETCH_TOTAL_INTERACTIONS_LOADING = 'FETCH_TOTAL_INTERACTIONS_LOADING';

// for dashboard loading and dashboard data getting.
export const FETCH_INTERACTIONS_DETAIL = 'FETCH_INTERACTIONS_DETAIL';
export const FETCH_INTERACTIONS_DETAIL_LOADING = 'FETCH_INTERACTIONS_DETAIL_LOADING';
export const FETCH_ACTIVE_USERS = 'FETCH_ACTIVE_USERS';
export const FETCH_ACTIVE_USERS_LOADING = 'FETCH_ACTIVE_USERS_LOADING';
export const FETCH_LIVE_USERS = 'FETCH_LIVE_USERS';
export const FETCH_LIVE_USERS_LOADING = 'FETCH_LIVE_USERS_LOADING';
export const FETCH_STATISTICS_GRAPH = 'FETCH_STATISTICS_GRAPH';
export const LOADING_CH_GRAPH = 'LOADING_CH_GRAPH';
export const FETCH_GENERAL_STATISTICS = 'FETCH_GENERAL_STATISTICS';
export const FETCH_GENERAL_STATISTICS_LOADING = 'FETCH_GENERAL_STATISTICS_LOADING';
export const FETCH_INTERACTIONS_TYPE = 'FETCH_INTERACTIONS_TYPE';
export const FETCH_INTERACTIONS_TYPE_LOADING = 'FETCH_INTERACTIONS_TYPE_LOADING';

// to manage receive, send and archive state through out the web.
export const SIDEBAR = 'SIDEBAR';

// to get notification.
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';

// to get all the send briifs.
export const READ_ALL_NOTIFICATIONS = 'READ_ALL_NOTIFICATIONS';

// briif creation.
export const CREATE_BRIIF = 'CREATE_BRIIF';

// local search.
export const FETCH_SEARCH_RECEIVE = 'FETCH_SEARCH_RECEIVE';
export const FETCH_SEARCH_SEND = 'FETCH_SEARCH_SEND';
export const FETCH_SEARCH_ARCHIVE = 'FETCH_SEARCH_ARCHIVE';

// global search.
export const GLOBAL_SEARCH = 'GLOBAL_SEARCH';

// get plat.
export const GET_PLAT = 'GET_PLAT';

// sendToken
export const SEND_TOKEN = 'SEND_TOKEN';

//to get giists data
export const GET_RECOMEND_USER = 'GET_RECOMEND_USER';

// like for giists.
export const INSERT_LIKE = 'INSERT_LIKE';

// screen recording through the whole web state handle.
export const SCREEN_RECORDING = 'SCREEN_RECORDING';

// to get single giist data.
export const CHAP_SUB_CHAP = 'CHAP_SUB_CHAP';

// live meeting users
export const LIVE_USERS = 'LIVE_USERS';

// follow and un follow user types respectively.
export const FOLLOW_USER = 'FOLLOW_USER';
export const UN_FOLLOW = 'UN_FOLLOW';

// to manage receive, send and archive state through out the web.
export const GLOBAL_SEARCH_TABS = 'GLOBAL_SEARCH_TABS';

// to get all the gist platform categories of giist.
export const GET_PLATFORM_CATEGORIES = 'GET_PLATFORM_CATEGORIES';

// to applay global search filters of datesand categories on briifs, people and giists.
export const GLOBAL_SEARCH_APPLY_FILTER = 'GLOBAL_SEARCH_APPLY_FILTER';

// Inspire Signup details form dropdown
export const SIGNUP_DROP = 'SIGNUP_DROP';

// Inspire signup for details form
export const SIGNUP_FORM = 'SIGNUP_FORM';

// user profile detail
export const MYPROFILE_USERS = 'MYPROFILE_USERS';

// home giists data
export const GET_HOME_GIISTS = 'GET_HOME_GIISTS';

// to get the play function globally.
export const PLAY_BRIIF_FUNCTION = 'PLAY_BRIIF_FUNCTION';

// get all rankings
export const GET_MY_RANKINGS = 'GET_MY_RANKINGS';

// get stats on combine home page
export const GET_STATS = 'GET_STATS';

// to get User Groups
export const USER_GROUPS = 'USER_GROUPS';
// to get User ACTIVITIES
export const USER_ACTIVITIES = 'USER_ACTIVITIES';

// to get User Groups
export const USER_GIISTS = 'USER_GIISTS';

// to get User Latest Giists
export const KH_LATEST_GIISTS = 'KH_LATEST_GIISTS';

// to get followed User Giists
export const KH_FOLLOWED_USER_GIISTS = 'KH_FOLLOWED_USER_GIISTS';

// to get watched Giists
export const KH_WATCHED_GIISTS = 'KH_WATCHED_GIISTS';

// to get watch again Giists
export const KH_WATCH_AGAIN_GIISTS = 'KH_WATCH_AGAIN_GIISTS';

//other user profile data
export const ANY_USER_DATA = 'ANY_USER_DATA';

//favourite Giist
export const KH_FAVOURITE_GIISTS = 'KH_FAVOURITE_GIISTS';

// update user profile
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
// Search filter in profile
export const PROFILE_SEARCH_APPLY_FILTER = 'PROFILE_SEARCH_APPLY_FILTER';
// Categories in profile filter
export const CATEGORIES_FILTER = 'CATEGORIES_FILTER';

// pubslied giists for published giists page
export const PUBLISHED_GIISTS = 'PUBLISHED_GIISTS';
// share with me in published giits page
export const SHARE_ME_GIISTS = 'SHARE_ME_GIISTS';
// Favourite giists in published giits page
export const FAVOURITE_GIISTS = 'FAVOURITE_GIISTS';
// Awaiting Review giists in published giits page
export const AWAITING_REVIEW = 'AWAITING_REVIEW';
// Counting number of giists in published giits page
export const COUNTING_NUMBER = 'COUNTING_NUMBER';

//giist creation details data
export const GIIST_DETAIL_DATA = 'GIIST_DETAIL_DATA';

// Play giists video
export const KH_PLAY_GIISTS = 'KH_PLAY_GIISTS';

// delete giist type
export const DEL_GIIST = 'DEL_GIIST';
// media library medias
export const LIBRARY_MEDIAS = 'LIBRARY_MEDIAS';
// add media type
export const ADD_MEDIA = 'ADD_MEDIA';

// to get all giist comments of a specific giist
export const GIIST_COMMENTS = 'GIIST_COMMENTS';

// to add comment on a giist
export const GIIST_POST_COMMENT = 'GIIST_POST_COMMENT';

// to delete comment on a giist
export const GIIST_DELETE_COMMENT = 'GIIST_DELETE_COMMENT';

// to react comment on a giist
export const GIIST_COMMENT_REACTION = 'GIIST_COMMENT_REACTION';

// to edit comment on a giist
export const GIIST_EDIT_COMMENT = 'GIIST_EDIT_COMMENT';

// delete media from library
export const DEL_MEDIA = 'DEL_MEDIA';
// counting media from library
export const COUNT_MEDIA = 'COUNT_MEDIA';
// giistcreation giist details
export const GIIST_CREATE_DETAIL = 'GIIST_CREATE_DETAIL';
// giistcreation giist CREATE_GIIST_CHAPTER
export const CREATE_GIIST_CHAPTER = 'CREATE_GIIST_CHAPTER';
// giistcreation, to edit first two tabs' data by showing
export const SHOW_TO_EDIT = 'SHOW_TO_EDIT';

export const KH_Quiz = 'KH_Quiz';
// giistcreation, UPLOADING webcam or screenrecording
export const CREATE_GIIST_CHAPTER_MEDIA = 'CREATE_GIIST_CHAPTER_MEDIA';
// reject giist
export const REJECT_GIIST = 'REJECT_GIIST';
// to edit a giist
export const GIIST_EDIT = 'GIIST_EDIT';

// to update a giist
export const UPDATE_GIIST = 'UPDATE_GIIST';
// to delete a giist's chapter
export const DEL_CHAPTER = 'DEL_CHAPTER';

export const DELETE_QUSETION = 'DELETE_QUSETION';

// to kh statistics
export const KH_STATISTICS = 'KH_STATISTICS';

export const KH_QUIZDELETE = 'KH_QUIZDELETE';

export const KH_STATISTICS_LOADING = 'KH_STATISTICS_LOADING';

// to kh total giists
export const KH_TOTAL_GIISTS = 'KH_TOTAL_GIISTS';
export const KH_TOTAL_GIISTS_LOADING = 'KH_TOTAL_GIISTS_LOADING';

// to kh giists interactions
export const KH_GIISTS_INTERACTIONS = 'KH_GIISTS_INTERACTIONS';
export const KH_GIISTS_INTERACTIONS_LOADING = 'KH_GIISTS_INTERACTIONS_LOADING';

export const Kh_Publish_Giist = 'Kh_Publish_Giist';

// to kh unPublish Giist
export const Kh_UnPublish_Giist = 'Kh_UnPublish_Giist';

// to kh Play Quiz

export const Kh_QuizPlay_Giist = 'Kh_QuizPlay_Giist';

export const Kh_Quiz_Submit = 'Kh_Quiz_Submit';

export const Kh_Get_result = 'Kh_Get_result';

export const Kh_PreView_Giist = 'Kh_PreView_Giist';

export const LOAD_ALL_COMMENTS = 'LOAD_ALL_COMMENTS';

export const Kh_Search = 'Kh_Search';

export const Final_Attempted = 'Final_Attempted';

export const Follow_Status = 'Follow_Status';

export const FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';

export const FETCH_PARTIAL_DATA_LOADING = 'FETCH_PARTIAL_DATA_LOADING';

export const DELETING_COMMENT = 'DELETING_COMMENT';

export const GIIST_COMMENT_DISLIKE = 'GIIST_COMMENT_DISLIKE';

export const GIIST_IDEAS_LIKE = 'GIIST_IDEAS_LIKE';
export const GIIST_IDEAS_DISLIKE = 'GIIST_IDEAS_DISLIKE';

export const GIIST_CELEB_LIKE = 'GIIST_CELEB_LIKE';
export const GIIST_CELEB_DISLIKE = 'GIIST_CELEB_DISLIKE';

export const GIIST_RATING = 'GIIST_RATING';

export const TIME_UP_FINAL_QUIZ = 'TIME_UP_FINAL_QUIZ';

export const SET_SELECTED_PLATFORM = 'SET_SELECTED_PLATFORM';

export const KH_ENGAGEMENT_RATE = 'KH_ENGAGEMENT_RATE';

export const PLATFORM_GROUPS = 'PLATFORM_GROUPS';

export const CREATE_GROUPS = 'CREATE_GROUPS';

export const EDIT_GROUP = 'EDIT_GROUP';

export const DELETE_GROUP = 'DELETE_GROUP';

export const GET_GROUPS = 'GET_GROUPS';

export const PLAT_CATEGORY = 'PLAT_CATEGORY';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const VIEW_CATEGORY = 'VIEW_CATEGORY';

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const TOP_GIISTS = 'TOP_GIISTS';

export const ADMIN_PLATFORM = 'ADMIN_PLATFORM';

export const DELETE_PLATFORM = 'DELETE_PLATFORM';

export const CREATE_PLATFORM = 'CREATE_PLATFORM';

export const VIEW_PLATFORM = 'VIEW_PLATFORM';

export const UPDATE_PLATFORM = 'UPDATE_PLATFORM';

export const DEL_CHAP_MEDIA = 'DEL_CHAP_MEDIA';

export const DELETE_GIIST = 'DELETE_GIIST';

export const GROUP_MEMBERS = 'GROUP_MEMBERS';

export const DELETE_GIIST_COMMENT = 'DELETE_GIIST_COMMENT';

export const DELETE_BRIIF = 'DELETE_BRIIF';

export const DELETE_MEETING = 'DELETE_MEETING';

export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export const VIEW_USERS = 'VIEW_USERS';

export const CREATE_USERS = 'CREATE_USERS';

export const UPDATE_USERS = 'UPDATE_USERS';

export const VIEW_PLATFORM_USER = 'VIEW_PLATFORM_USER';

export const DELETE_GROUP_MEMBER = 'DELETE_GROUP_MEMBER';

export const GROUP_MEMBERS_IDS = 'GROUP_MEMBERS_IDS';

export const DELETE_BRIIFS = 'DELETE_BRIIFS';

export const DRAFT_BRIIFS = 'DRAFT_BRIIFS';

export const DRAFT_BRIIFS_DELETE = 'DRAFT_BRIIFS_DELETE';

export const DRAFT_SEARCH_BRIIFS = 'DRAFT_SEARCH_BRIIFS';

export const SET_GLOBAL_PINNED = 'SET_GLOBAL_PINNED';

export const INCREMENT_NOTIFICATION_COUNT = 'INCREMENT_NOTIFICATION_COUNT';
export const MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ';

export const DELETE_INTERACTION = 'DELETE_INTERACTION';

export const USER_PLATFROM = 'USER_PLATFROM';

export const SENDING_INVITATION = 'SENDING_INVITATION';

export const CREATE_WEB_CONFERENCE = 'CREATE_WEB_CONFERENCE';

export const FETCHING_CONFERENCE_USERS = 'FETCHING_CONFERENCE_USERS';

export const PEOPLE_JOIN_CONFERENE = 'PEOPLE_JOIN_CONFERENE';

export const SEND_CHANNEL = 'SEND_CHANNEL';
export const USER_IN_CONFERENCE = 'USER_IN_CONFERENCE';

export const DELETE_COMMENTS = 'DELETE_COMMENTS';

export const OTP_VERIFY = 'OTP_VERIFY';

export const RESEND_OTP = 'RESEND_OTP';

export const REMOVE_USER_FROM_MEET = 'REMOVE_USER_FROM_MEET';

export const START_CONFERENCE_RECORDING = 'START_CONFERENCE_RECORDING';

export const END_CONFERENCE = 'END_CONFERENCE';

export const ADD_HOST = 'ADD_HOST';

export const ALL_BRIIFS_COUNTS = 'ALL_BRIIFS_COUNTS';

export const UPDATE_JOINED_USERS_LIST = 'UPDATE_JOINED_USERS_LIST';

export const STOP_CONFERENCE_RECORDING = 'STOP_CONFERENCE_RECORDING';

export const DRAFT_USERS_BRIIFS = 'DRAFT_USERS_BRIIFS';

export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';

export const LOGOUT_USER = 'LOGOUT_USER';

export const SEARCH_USERS = 'SEARCH_USERS';

export const SEARCH_GROUPS = 'SEARCH_GROUPS';

export const FIRST_USERS = 'FIRST_USERS';

export const FIRST_GROUPS = 'FIRST_GROUPS';
