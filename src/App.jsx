import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import ProjectForm from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    project: [],
    task: [],
  });
  function startAddProject() {
    setProjectsState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  }
  function onAddProject(projectData) {
    setProjectsState((prevState) => {
      const randomId = Math.random();
      const newProjectData = {
        ...projectData,
        id: randomId,
      };
      return {
        ...prevState,
        selectedProjectId: randomId,
        project: [...prevState.project, newProjectData],
      };
    });
  }
  function onAddTask(text) {
    setProjectsState((prevState) => {
      const newTaskData = {
        text: text,
        id: Math.random(),
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        task: [...prevState.task, newTaskData],
      };
    });
  }
  function onDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        task: prevState.task.filter((tasks) => tasks.id !== id),
      };
    });
  }
  function handleOnCancelProject() {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: undefined };
    });
  }

  function onProjectSelected(id) {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  }

  function handleProjectDelete() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        project: prevState.project.filter((project) => {
          project.id !== prevState.selectedProjectId;
        }),
      };
    });
  }
  const selectedProject = projectsState.project.find((project) => {
    return project.id === projectsState.selectedProjectId;
  });
  let content = (
    <SelectedProject
      project={selectedProject}
      handleProjectDelete={handleProjectDelete}
      onAddTask={onAddTask}
      onDeleteTask={onDeleteTask}
      tasks={projectsState.task}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <ProjectForm
        onAddProject={onAddProject}
        onCancel={handleOnCancelProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={startAddProject}
        projects={projectsState.project}
        onProjectSelected={onProjectSelected}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
