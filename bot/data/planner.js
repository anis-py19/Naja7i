import { STREAM_STUDY_PLANS, PLANNING_PRINCIPLES } from '../../src/data/plannerData.js';

export { STREAM_STUDY_PLANS, PLANNING_PRINCIPLES };

export function getStudyPlan(streamId, type = 'school') {
  const streamPlan = STREAM_STUDY_PLANS[streamId] || STREAM_STUDY_PLANS.sciences;
  return {
    streamInfo: streamPlan,
    planData: streamPlan[type] || streamPlan.school,
    type
  };
}
