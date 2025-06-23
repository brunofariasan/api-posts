import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

export async function createItem(req: Request, res: Response): Promise<void> {
  const { field1, field2 } = req.body;
  const { data, error } = await supabase
    .from("items")
    .insert([{ field1, field2 }])
    .select();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(data);
}

export async function getItems(_req: Request, res: Response): Promise<void> {
  const { data, error } = await supabase.from("items").select("*");
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
}

export async function updateItem(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { field1, field2 } = req.body;
  const { data, error } = await supabase
    .from("items")
    .update({ field1, field2 })
    .eq("id", id)
    .select();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
}

export async function deleteItem(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(204).send();
}
