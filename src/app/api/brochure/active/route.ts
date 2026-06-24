import { NextResponse } from "next/server";
import { getActiveBrochure } from "@/app/actions/brochure";
import { getFeatures } from "@/app/actions/features";

export async function GET(request: Request) {
  try {
    const features = await getFeatures();
    const brochureFeature = features.find(f => f.id === 'brochure');
    if (!brochureFeature || !brochureFeature.active) {
      return NextResponse.json({ url: null, title: null });
    }

    const { searchParams } = new URL(request.url);
    const unitId = searchParams.get('unitId') || undefined;

    const active = await getActiveBrochure(unitId);
    if (active) {
      return NextResponse.json({ url: active.url, title: active.title });
    }
    return NextResponse.json({ url: null, title: null });
  } catch (error) {
    console.error("Error fetching active brochure:", error);
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
