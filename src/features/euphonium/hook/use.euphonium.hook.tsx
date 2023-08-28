/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { EuphoniumProps } from "../model/euphonium.model.js";
import * as ac from "../reducer/euphonium.action.creator";
import { newImage } from "../services/firebase/firebase-user";
import { EuphoniumRepo } from "../services/repository/euphonium.repo.js";

export function useEuphonium(repo: EuphoniumRepo) {
  const page = useSelector((state: RootState) => state.page);
  const filter = useSelector((state: RootState) => state.filter);
  const euphoniums = useSelector((state: RootState) => state.euphoniums);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (page.currentPage === 1 && filter.filter === "") {
      loadEuphoniums();
      return;
    }

    loadEuphoniumsPaginated(page.currentPage.toString(), filter.filter);
  }, [page.currentPage, filter.filter]);

  const loadEuphoniums = async () => {
    try {
      const data = await repo.loadEuphoniums();
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadOneEuphonium = async (id: string) => {
    try {
      const data = await repo.getEuphonium(id);
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteEuphonium = async (id: EuphoniumProps["id"], token: string) => {
    try {
      const itemId: string = id;
      await repo.deleteEuphonium(itemId, token);
      dispatch(ac.deleteCreator(itemId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const clearEuphoniumsList = () => {
    dispatch(ac.clearCreator([]));
  };

  const addEuphonium = async (
    euphonium: EuphoniumProps,
    token: string,
    file: File
  ) => {
    try {
      await newImage(euphonium, file);
      await repo.createEuphonium(euphonium, token);
      dispatch(ac.addCreator(euphonium));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateEuphonium = async (
    euphonium: EuphoniumProps,
    token: string,
    file: File
  ) => {
    try {
      if (file) {
        await newImage(euphonium, file);
      }

      await repo.updateEuphonium(euphonium, token);
      dispatch(ac.updateCreator(euphonium));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadEuphoniumsPaginated = async (offset: string, material: string) => {
    try {
      const data = await repo.loadEuphoniumsPaginated(offset, material);
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    euphoniums,
    loadEuphoniums,
    loadOneEuphonium,
    loadEuphoniumsPaginated,
    deleteEuphonium,
    clearEuphoniumsList,
    updateEuphonium,
    addEuphonium,
  };
}
