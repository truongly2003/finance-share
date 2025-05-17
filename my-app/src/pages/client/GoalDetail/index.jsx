import { Link, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getGoalById } from "@/services/GoalService";
import ProgressBar from "@/components/ProgressBar";
import ContributionForm from "@/components/ContributionForm";
import { getAllContributeByGoalIdAndUserId } from "@/services/Goal-Contribute";
import GoalForm from "@/components/GoalForm";
import useAuth from "@/context/useAuth";
export default function GoalDetail() {
  const { userId } = useAuth();
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [contributes, setContributes] = useState([]);
  console.log(contributes);
  const [showFormContribution, setShowFormContribution] = useState(false);
  const [editingContribute, setEditingContribute] = useState(null);
  //
  const [showFormGoal, setShowFormGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const fetchData = useCallback(async () => {
    try {
      const goalResponse = await getGoalById(id);
      if (goalResponse.data) {
        setGoal(goalResponse.data);
        const contributeResponse = await getAllContributeByGoalIdAndUserId(
          goalResponse.data.id,
          userId
        );
        console.log(contributeResponse);
        if (contributeResponse.data) {
          setContributes(contributeResponse.data);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  }, [id, userId]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!goal) {
    return <div>Đang tải dữ liệu...</div>;
  }

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const progressColor =
    goal.targetAmount >= goal.currentAmount ? "bg-red-500" : "bg-green-500";

  return (
    <div className=" ">
      <div className="p-6 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="rounded-lg bg-white">
         
              {/* Thanh điều hướng */}
              <div className="flex  space-x-1 justify-between">
                <Link
                  to="/goal"
                  className="text-gray-600 hover:text-purple-600 space-x-4 flex items-center"
                >
                  <MoveLeft className="text-gray-400" /> Back to goals
                </Link>
                <h2 className="text-xl font-semibold text-purple-600">
                  {goal.goalName}
                </h2>
                <div className="space-x-4">
                  <button
                    className=" bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 "
                    onClick={() => {
                      setShowFormGoal(true);
                      setEditingGoal(goal);
                    }}
                  >
                    Edit Goal
                  </button>
                  <button
                    className=" bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 "
                    onClick={() => {
                      setShowFormContribution(true);
                      setEditingContribute(null);
                    }}
                  >
                    Create New Contribute
                  </button>
                </div>
              </div>
            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
              {[
                { title: "Goal Target", value: goal.targetAmount },
                { title: "Saved So Far", value: goal.currentAmount },
                { title: "Amount Remaining", value: goal.targetAmount - goal.currentAmount },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center"
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-semibold text-purple-600">
                    {item.value.toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white mt-4">
            <div className="p-4">
            <h3 className="text-lg font-semibold text-purple-500 mb-4">
                Goal Progress
              </h3>
              {/* <div className="flex justify-center">
                <span className="text-gray-600">
                Amount remaining: {" "}
                  {(goal.targetAmount - goal.currentAmount).toLocaleString()} đ{" "}
                </span>
              </div> */}
              <div className="flex justify-between">
                <p className="text-gray-500 mb-2">{`${progress.toFixed(
                  0
                )}% of goal achieved`}</p>
                <p className="text-gray-500 ">
                {`${goal.currentAmount.toLocaleString()}đ / ${goal.targetAmount.toLocaleString()}đ`}
                </p>
              </div>
              <div className="flex justify-center w-full">
                <div className="w-full ">
                  <ProgressBar
                    progress={progress}
                    progressColor={progressColor}
                    endDate={goal.deadline}
                  />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-purple-500 mb-4">
                List of contributed transactions
                </h3>

                {contributes.length > 0 ? (
                  <div className="mt-2 space-y-3">
                    {contributes.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm 
                    cursor-pointer hover:shadow-md transition-all duration-200 
                    border border-gray-100 hover:border-gray-200"
                        onClick={() => {
                          setShowFormContribution(true);
                          setEditingContribute(item);
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 
                          flex items-center justify-center"
                          >
                            <span className="text-blue-600 font-medium">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">
                              {new Date(
                                item.contributionDate
                              ).toLocaleDateString("vi-VN")}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <span
                          className="text-red-500 font-semibold bg-red-50 px-3 py-1 
                         rounded-full text-sm"
                        >
                          + {item.amount.toLocaleString()} đ
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl mt-2">
                    <p className="text-gray-500">No contributions yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div></div>
          {/* form goal */}
          {showFormGoal && (
            <GoalForm
              initialGoal={editingGoal}
              onClose={() => setShowFormGoal(false)}
              onSuccess={fetchData}
            />
          )}
          {/* form contribution */}
          {showFormContribution && (
            <ContributionForm
              initialContribute={editingContribute}
              onClose={() => setShowFormContribution(false)}
              onSuccess={fetchData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
