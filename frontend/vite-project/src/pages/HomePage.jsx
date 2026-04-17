import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFillter from "@/components/StatsAndFillter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTasksLimit } from "@/lib/data";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter , dateQuery]);

  //logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.log("Lỗi", error);
      toast.error("Không thể tải danh sách công việc. Vui lòng thử lại sau.");
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //  biến lưu nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTasksLimit,
    page * visibleTasksLimit,
  );

  if(visibleTasks.length === 0){
  handlePrev();  
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTasksLimit);

  return (
    <div className="min-h-screen w-full relative">
      {/* Aurora Dream Corner Whispers */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
        }}
      />
      <div className="container pt-8 relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang  */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFillter
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completeTasksCount={completeTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          <div className="flex flex-col justify-between items-center gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chân trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completeTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
