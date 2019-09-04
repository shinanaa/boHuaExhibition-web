/**
 * Created by qianggao on  2018/11/16
 */
const i = {
  loginOn: { url: 'Account/WebLogin', isMock: false }, // 登录
  getNewsDataPager: { url: 'Exhibition/GetNewsDataPager', isMock: false }, // 获取我的投稿
  getGraduationRequire: { url: 'attestation/graduationRequire', isMock: true }, // 获取毕业要求列表
  getRequireCourses: { url: 'attestation/getRequireCourses', isMock: true }, // 获取要求与课程列表
  getEligibility: { url: 'attestation/getEligibility', isMock: true }, // 获取合格标准列表
  getSetWeights: { url: 'attestation/getSetWeights', isMock: true }, // 获取设置权重列表
  getCourses: { url: 'attestation/getCourses', isMock: true }, // 获取设置权重弹框中列表
  getTrainTarget: { url: 'attestation/getTrainTarget', isMock: true }, // 获取培养目标列表
  getStandards: { url: 'attestation/getStandards', isMock: true }, // 获取认证标准列表
  addDialog: { url: 'attestation/addDialog', isMock: true }, // 添加表格数据
  editDialog: { url: 'attestation/editDialog', isMock: true }, // 编辑选中表格内容
  deleteDialog: { url: 'attestation/deleteDialog', isMock: true }, // 删除选中表格内容
  getSearchData: { url: 'attestation/getSearchData', isMock: true }, // 获取查询的数据
  getChooseData: { url: 'attestation/getChooseData', isMock: true }, // 获取学校/专业/学年列表
  getCourseManage: { url: 'course/getCourseManage', isMock: true }, // 获取课程管理页面数据
  getKnowledge: { url: 'course/getKnowledge', isMock: true }, // 获取章节知识点页面数据
  getIndicator: { url: 'course/getIndicator', isMock: true }, // 获取对应指标点页面数据
  getCoursesTarget: { url: 'course/target/getCoursesTarget', isMock: true }, // 获取课程安排页面课程目标标签页下的内容
  getCoursesModule: { url: 'course/target/getCoursesModule', isMock: true }, // 获取课程安排页面课程模块标签页下的内容
  getCoursesContent: { url: 'course/target/getCoursesContent', isMock: true }, // 获取课程安排页面课程内容标签页下的内容
  getCoursesCheck: { url: 'course/target/getCoursesCheck', isMock: true }, // 获取课程安排页面考核要点标签页下的内容
  getCoursesStandard: { url: 'course/target/getCoursesStandard', isMock: true }, // 获取课程安排页面考评分标准标签页下的内容
  getCoursesForm: { url: 'course/getCoursesForm', isMock: true }, // 获取课程组成页面数据
  setCourseDispose: { url: 'course/setCourseDispose', isMock: true }, // 课程组成页面设置课程配置
  getCourseDetails: { url: 'course/getCourseDetails', isMock: true }, // 获取课程组成页面查看详情的数据内容
  getPeaseDetails: { url: 'statistics/getPeaseDetails', isMock: true }, // 获取课程组成详情页的平时成绩详情内容
  getRequireAchievement: { url: 'statistics/getRequireAchievement', isMock: true }, // 获取毕业要求达成度页面数据
  getRequireDetails: { url: 'statistics/getRequireDetails', isMock: true }, // 获取毕业要求达成度页面中每一个毕业要求对应的数据
  getAchievementTable: { url: 'statistics/getAchievementTable', isMock: true }, // 获取要求达成度计算表页面数据
  getCourseAchievement: { url: 'statistics/getCourseAchievement', isMock: true }, // 获取课程达成度页面表格数据
  getCourseAchievementDetails: { url: 'statistics/getCourseAchievementDetails', isMock: true }, // 获取课程达成度详情表格数据
  mouthReport: { url: 'yunying/monthReport', isMock: false }, // 运营月度报告
  dailyRepayment: { url: 'yunying/dailyRepayment', isMock: false }, // 当日还款计划
  dailyStatistics: { url: 'yunying/dailyStatistics', isMock: false }, // 当日产品销售统计
  unrepayRecord: { url: 'yunying/unrepayRecord', isMock: false }, // 待收总览
  getLineData: { url: 'yunying/countDaily', isMock: false }, // 整点报数对比图
  getSourceCount: { url: 'yunying/sourceCountDaily', isMock: false }, // 充值提现信息
  getSourceFund: { url: 'yunying/sourceFundAndIncomeDaily', isMock: false }, // 应收本金收益
  getMaturityCont: { url: 'yunying/expireHistory', isMock: false }, // 到期明细
  getMaturityContPage: { url: 'yunying/expireHistoryPage', isMock: false } // 到期明细
}

export default i
