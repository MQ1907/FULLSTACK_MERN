import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success(`Nhiệm vụ "${task.title}" đã được xóa thành công!`);
      handleTaskChanged();
    } catch (error) {
      console.log("Loi xay ra khi xoa nhiem vu", error);
      toast.error("Không thể xoa nhiệm vụ. Vui lòng thử lại sau.");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false)
      await api.put(`/tasks/${task._id}`,{
        title:updateTaskTitle
      })
      toast.success(`Nhiệm vụ đã được đổi thành ${updateTaskTitle} thành công!`);
      handleTaskChanged();
    } catch (error) {
        console.log("Loi xay ra khi cập nhật nhiem vu", error);
        toast.error("Không thể cập nhật nhiệm vụ. Vui lòng thử lại sau.");
    }
  }

  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === "active"){
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        toast.success(`Chúc mừng bạn đã hoàn thành nhiệm vụ "${task.title}"! 🎉`);
       
      }else{
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`Nhiệm vụ "${task.title}" đã được mở lại!`);
      }
      handleTaskChanged();
    } catch (error) {
      console.log("Loi xay ra khi cập nhật nhiem vu", error);
      toast.error("Không thể cập nhật nhiệm vụ. Vui lòng thử lại sau.");
    }
  }

  const handleKeyPress = (even) => {
    if (even.key === "Enter") {
      updateTask();
    }
  };

  return (
    <div>
      <Card
        className={cn(
          "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
          task.status === "complete" && "opacity-75",
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className=" flex items-center gap-4">
          {/* nút tròn  */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 size-8 rounded-full duration-200",
              task.status === "complete"
                ? "text-success hover:text-success/80"
                : "text-muted-foreground hover:text-primary",
            )}
            onClick={toggleTaskCompleteButton}
          >
            {task.status === "complete" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>

          {/* hiển thị hoặc chỉnh sửa title của task */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                placeholder="Cần phải làm gì?"
                className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                type="text"
                value={updateTaskTitle}
                onChange={(even) => setUpdateTaskTitle(even.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  setIsEditing(false);
                  setUpdateTaskTitle(task.title || "");
                }}
              />
            ) : (
              <p
                className={cn(
                  "text-base transition-all duration-200",
                  task.status === "complete"
                    ? "line-through text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {task.title}
              </p>
            )}
            {/* ngày tạo và ngày hoàn thành */}
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleString("vi-VN")}
              </span>
              {task.completedAt && (
                <>
                  <span className="text-xs text-muted-foreground"> - </span>
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.completedAt).toLocaleString("vi-VN")}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* nút chỉnh và nút xóa  */}
          <div className="hidden gap-2 group-hover:inline-flex animation-slide-up">
            {/* nút edit */}
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 size-8  transition-colors text-muted-foreground hover:text-info"
              onClick={() => {
                setIsEditing(true);
                setUpdateTaskTitle(task.title || "");
              }}
            >
              <SquarePen className="size-4" />
            </Button>
            {/* nút delete */}
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 size-8  transition-colors text-muted-foreground hover:text-destructive"
              onClick={() => deleteTask(task._id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
