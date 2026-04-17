import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`Nhiem vụ "${newTaskTitle}" đã được thêm thành công!`);
        handleNewTaskAdded("");
      } catch (error) {
        console.log("Loi xay ra khi them nhiem vu", error);
        toast.error("Không thể thêm nhiệm vụ. Vui lòng thử lại sau.");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Tiêu đề nhiệm vụ không được để trống!");
    }
  };

  const handleKeyPress = (even) => {
    if (even.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <Card className="p-6 border-0 radius-2xl bg-gradient-card shadow-custom-lg ">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="Nhập tên nhiệm vụ..."
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            value={newTaskTitle}
            onChange={(even) => setNewTaskTitle(even.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="gradient"
            size="xl"
            className="px-6"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="size-5" />
            Thêm nhiệm vụ
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddTask;
