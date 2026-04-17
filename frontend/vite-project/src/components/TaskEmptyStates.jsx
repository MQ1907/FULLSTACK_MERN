import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyStates = ({ filter }) => {
  return (
    <div>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
        <div className="space-y-3">
          <Circle className="size-12 mx-auto text-muted-foreground" />
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có nhiệm vụ đang làm nào!"
              : filter === "complete"
                ? "Không có nhiệm vụ đã hoàn thành nào!"
                : "Không có nhiệm vụ nào!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Hãy thêm một nhiệm vụ mới để bắt đầu quản lý công việc của bạn!"
              : `Chuyển sang tất cả nhiệm vụ ${filter === "active" ? "đã hoàn thành" : "đang làm"}`
          
              }

          </p>
        </div>
      </Card>
    </div>
  );
};

export default TaskEmptyStates;
