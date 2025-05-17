import GoalForm from "@/components/GoalForm";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/context/useAuth";
import { getAllGoalByUserId } from "@/services/GoalService";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Goal() {
  const { userId } = useAuth();
  const [goal, setGoal] = useState([]);
  const [showFormGoal, setShowFormGoal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredGoals = goal.filter((g) => {
    return (
      g.goalName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" ||
        (statusFilter === "completed" && g.currentAmount >= g.targetAmount) ||
        (statusFilter === "incomplete" && g.currentAmount < g.targetAmount))
    );
  });
  const fetchGoal = useCallback(async () => {
    try {
      const response = await getAllGoalByUserId(userId);
      setGoal(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);
  return (
    <div className=" ">
      <div className="p-6 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-purple-600">Goals</h2>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 "
              onClick={() => setShowFormGoal(true)}
            >
              Create new goal
            </button>
          </div>

          <div className="bg-white shadow-md border rounded-lg   p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filter</h2>
            </div>
            <div className="grid grid-cols-3 gap-4  ">
              <div className="col-span-1 ">
                <label className="text-sm text-gray-600">Search</label>
                <input
                  placeholder="Search goal..."
                  className="outline-none border rounded p-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-span-1 ">
                <label className="text-sm text-gray-600">Status</label>
                <select
                  className=" border rounded p-2 w-full "
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="incomplete">Completed</option>
                  <option value="completed">Unfinished</option>
                </select>
              </div>

              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="mt-6 ">
            <div className=" ">
              {filteredGoals.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl mt-2">
                  <p className="text-gray-500">No goal yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {filteredGoals.map((goal, index) => {
                    const progress = Math.round(
                      (goal.currentAmount / goal.targetAmount) * 100
                    );

                    const progressColor =
                      goal.targetAmount >= goal.currentAmount
                        ? "bg-red-500"
                        : "bg-purple-500";

                    return (
                      <Link
                        key={index}
                        className="bg-white  shadow-md rounded-lg p-4 cursor-pointer border hover:border-purple-300"
                        to={`/goal/goal-detail/${goal.id}`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold text-purple-600">
                              {goal.goalName}
                            </h3>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-2">
                              Has been achieved: {goal.currentAmount.toLocaleString()}{" "}
                              đ/{goal.targetAmount.toLocaleString()} đ
                            </p>
                          </div>
                          {/* progress */}
                          <ProgressBar
                            progress={progress}
                            progressColor={progressColor}
                            startDate={goal.deadline}
                            endDate={goal.deadline}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {/* showFormGoal */}
          {showFormGoal && (
            <GoalForm
              onClose={() => setShowFormGoal(false)}
              onSuccess={fetchGoal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Goal;
